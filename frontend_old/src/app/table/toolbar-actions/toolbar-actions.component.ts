import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActionDefault, TableConfiguration } from '../utils/utils';
import { ExportDataService } from '../services/export-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ColumnVisibilitySelectorComponent } from '../column-visibility-selector/column-visibility-selector.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-toolbar-actions',
  standalone: true,
  templateUrl: './toolbar-actions.component.html',
  styleUrl: './toolbar-actions.component.scss',
  imports: [CommonModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatRippleModule, MatMenuModule, MatTooltipModule, ColumnVisibilitySelectorComponent]
})
export class ToolbarActionsComponent implements OnInit {

  @Input() settings: TableConfiguration;
  @Input() dataSource: MatTableDataSource<any>;

  @Output() add = new EventEmitter<any>();
  @Output() massive = new EventEmitter<any>();

  constructor(private exportService: ExportDataService) { }

  ngOnInit(): void {
  }



  get hideableColumns(): any[] {
    return this.settings.columns.filter(col => col.canHide === true);
  }

  grisar(condicion): boolean {
    return !this.settings.editable || this.evaluarCondicionDefault(condicion);
  }

  grisarEditing(condicion): boolean {
    return this.evaluarCondicionDefault(condicion);
  }
  evaluarCondicionDefault(condicion): boolean {

    if (!condicion) return false; // Si no hay condición definida, se asume false
    try {
      return condicion();
    } catch (error) {
      console.error('Error evaluando condición:', error);
      return false;
    }
  }

  executeMassive(name) {
    this.massive.emit(name);
  }

  evaluateConditionMassive(action) {
    if (!action.condicion) return false; // Si no hay condición definida, se asume false
    try {
      return action.condicion(); // No hay forma de pasar los elementos seleccionados, ya que son un Evento. 
    } catch (error) {
      console.error('Error evaluando condición:', error);
      return false;
    }

  };

  isHidenColumn(): boolean {
    return this.settings.createHidenAction
  }

  isAdd(): boolean {
    return this.settings.editable && this.settings.createAddAction
  }

  isExport(): boolean {
    return this.settings.createExportAction;
  }

  export(type) {
    this.exportService.export(type, this.settings.columns, this.dataSource, this.settings.exportName);
  }

  get actionHidenColumn(): ActionDefault {
    let action = undefined
    action = this.settings.hidenAction;
    return action;
  }

  get actionAdd(): ActionDefault {
    let action = undefined
    action = this.settings.addAction;
    return action;
  }

  get actionExport(): ActionDefault {
    let action = undefined
    action = this.settings.exportAction;
    return action;
  }
}


