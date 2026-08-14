import { Component, input, OnInit, output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActionDefault, TableConfiguration } from '../utils/utils';
import { ExportDataService } from '../services/export-data.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ColumnVisibilitySelectorComponent } from '../column-visibility-selector/column-visibility-selector.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../button/button.component';


@Component({
  selector: 'app-toolbar-actions', standalone: true,
  imports: [ MatButtonModule, MatRippleModule, MatMenuModule, MatTooltipModule, ColumnVisibilitySelectorComponent, ButtonComponent],
  templateUrl: './toolbar-actions.component.html',
  styleUrl: './toolbar-actions.component.scss',
})
export class ToolbarActionsComponent implements OnInit {

  settings = input.required<TableConfiguration>();
  dataSource = input.required<MatTableDataSource<any>>();

  add = output<any>();
  massive = output<any>();
  openSelected = output<void>();

  constructor(private exportService: ExportDataService) { }

  ngOnInit(): void {
  }



  get hideableColumns(): any[] {
    return this.settings().columns.filter(col => col.canHide === true);
  }

  grisar(condicion: any): boolean {
    return !this.settings().editable || this.evaluarCondicionDefault(condicion);
  }

  grisarEditing(condicion: any): boolean {
    return this.evaluarCondicionDefault(condicion);
  }
  evaluarCondicionDefault(condicion: any): boolean {

    if (!condicion) return false; // Si no hay condición definida, se asume false
    try {
      return condicion();
    } catch (error) {
      console.error('Error evaluando condición:', error);
      return false;
    }
  }

  executeMassive(name: string) {
    this.massive.emit(name);
  }

  evaluateConditionMassive(action: any) {
    if (!action.condicion) return false; // Si no hay condición definida, se asume false
    try {
      return action.condicion(); // No hay forma de pasar los elementos seleccionados, ya que son un Evento. 
    } catch (error) {
      console.error('Error evaluando condición:', error);
      return false;
    }

  };

  isHidenColumn(): boolean {
    return this.settings().createHidenAction
  }

  isAdd(): boolean {
    const settings = this.settings();
    return settings.editable && settings.createAddAction
  }

  isExport(): boolean {
    return this.settings().createExportAction;
  }

  isOpenSelected(): boolean {
    return this.settings().createOpenSelectedAction;
  }
  // export(type: any):void {
  //   const settings = this.settings();
  //   this.exportService.export(type, settings.columns, this.dataSource(), settings.exportName)
  //     .catch((err: any) => console.error('Error al exportar:', err));
  // }

  export(type: 'pdf' | 'xls' | 'csv') {
    const settings = this.settings();

    try {
      this.exportService.export(
        type,
        settings.columns,
        this.dataSource(),
        settings.exportName
      );
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  }
  get actionHiddenColumn(): ActionDefault | undefined {
    return this.settings().hidenAction;
  }

  get actionAdd(): ActionDefault | undefined {
    return this.settings().addAction;
  }

  get actionExport(): ActionDefault {
    return this.settings().exportAction;
  }

  get actionOpenSelected(): ActionDefault | undefined {
    return this.settings().openSelectedAction;
  }
}


