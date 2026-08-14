import { Component, input, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TextCellEditor } from './text-cell-editor/text-cell-editor.component';
import { NumberCellEditor } from './number-cell-editor/number-cell-editor.component';
import { ListCellEditor } from './list-cell-editor/list-cell-editor.component';
import { CustomCellEditor } from './custom-cell-editor/custom-cell-editor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColumnSetting } from '../utils/utils';
import { TableFormService } from '../services/table-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  imports: [ CommonModule,TextCellEditor, NumberCellEditor, ListCellEditor, CustomCellEditor, MatFormFieldModule]
})
export class TableCellComponent {

  column = input.required<any>();
  row = input<any>();
  isEditing = input(false);
  settings = input<any>();

  editConfirm = output<any>();
  addConfirm = output<any>();

  constructor(private tableFormService: TableFormService) { }

  getCellClass(): string | undefined {
    return this.column().cellClass?.(this.row());
  }

  // getter seguro: devuelve AbstractControl | null
  get control(): AbstractControl | null {
    let formGroup = this.getForm(this.row());
    return formGroup ? formGroup.get(this.column().key) : null;
  }

  get parameters(): any | null {
    return this.column().editor.parameters;
  }
  errorKeys(errors: any): string[] {
    return errors ? Object.keys(errors) : [];
  }

  isFormControl(ctrl: AbstractControl | null): ctrl is FormControl {
    return ctrl instanceof FormControl;
  }

  addEditConfirmed() {
    const row = this.row();
    if (row.__isNew) this.addConfirm.emit(row);
    else this.editConfirm.emit(row);
  }

  isColumnEditable(column: ColumnSetting, row: any): boolean {
    let formGroup = this.getForm(this.row());
    let result = false;
    if (!column.editor || !formGroup) {
      return false;
    }
    if (row.__isNew) {
      result = typeof column.isAddable === 'function'
        ? column.isAddable(formGroup.value)
        : column.isAddable;
    } else {
      result = typeof column.isEditable === 'function'
        ? column.isEditable(formGroup.value)
        : column.isEditable;
    }
    if (this.isEditing() && this.control && this.control?.value !== row[column.key] && !result)
      this.control.setValue(row[column.key]);
    return result
  }

  getForm(row: any): FormGroup | null {
    return this.tableFormService.getForm(row.__uid) ?? null;
  }
}
