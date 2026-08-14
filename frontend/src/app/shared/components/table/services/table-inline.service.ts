import { inject, Injectable } from '@angular/core';
import { ColumnSetting, TableConfiguration } from '../utils/utils';
import { TableFormService } from './table-form.service';
import { TableStateService } from './table-state.service';

@Injectable()
export class TableInlineService {

  private tableFormService = inject(TableFormService);
  private tableStateService = inject(TableStateService);

  private buildBaseRow(columns: ColumnSetting[]) {
    const row: any = {
      __uid: this.generateUUID(),
      __isNew: true
    };

    columns
      .filter(c => c.key !== 'acciones')
      .forEach(c => {
        row[c.key] = null;
      });

    return row;
  }

  private generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addRow(params: {
    columns: ColumnSetting[],
    settings: TableConfiguration
  }) {
    const { columns, settings } = params;

    const base = settings.rowCreateFunction?.() ?? {};

    return {
      ...this.buildBaseRow(columns),
      ...base
    };
  }

  copyRow(params: {
    row: any,
    columns: ColumnSetting[],
    settings: TableConfiguration
  }) {
    const { row, columns, settings } = params;
  
    if (!settings.rowCopyFunction) {
      throw new Error(
         'Debe definir rowCopyFunction para utilizar la copia de filas'
      );
    }
    const base = settings.rowCopyFunction(row);

    return {
      ...this.buildBaseRow(columns),
      ...base
    };
  }

  insertRow(params: {
    data: any[],
    newRow: any,
    paginator?
  }) {
    const { data, newRow, paginator } = params;

    const newData = [...data];

    let index = 0;

    if (paginator) {
      index = paginator.pageIndex * paginator.pageSize;
    }

    newData.splice(index, 0, newRow);

    return newData;
  }

  startEdit(params: {
    row: any,
    columns: ColumnSetting[],
    touched?: boolean
  }) {
    const { row, columns, touched } = params;

    if (!this.tableStateService.isEditing(row)) {
      this.tableStateService.saveOriginal(row);
      this.tableStateService.startEditing(row);

      let fg = this.tableFormService.getForm(row.__uid);

      if (!fg) {
        fg = this.tableFormService.createForm(row, columns);
      }

      if (touched && fg) {
        fg.markAllAsTouched();
      }
    }
  }

  addInline(params: {
    data: any[],
    columns: ColumnSetting[],
    settings: TableConfiguration,
    paginator?
  }) {
    const { data, columns, settings, paginator } = params;

    const newRow = this.addRow({ columns, settings });

    const newData = this.insertRow({
      data,
      newRow,
      paginator
    });

    this.tableStateService.startAdding(newRow);

    return { newRow, newData };
  }

  copyInline(params: {
    row: any,
    data: any[],
    columns: ColumnSetting[],
    settings: TableConfiguration
  }) {
    const { row, data, columns, settings } = params;

    const newRow = this.copyRow({ row, columns, settings });

    const newData = [newRow, ...data];

    this.tableStateService.startAdding(newRow);

    return { newRow, newData };
  }
}