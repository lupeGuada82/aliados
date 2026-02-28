import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActionDefault, TableConfiguration } from '../utils/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.scss', 
  imports: [CommonModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatRippleModule, MatMenuModule, MatTooltipModule]
})
export class TableActionsComponent {
  @Input() settings= new TableConfiguration();
  @Input() row: any;
  @Input() index: number;
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() isEditing = false;

  @Output() show = new EventEmitter<any>();
  @Output() navigate = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() addConfirm = new EventEmitter<any>();
  @Output() copy = new EventEmitter<any>();

  allVisibleActions: any[] = []; // 👈 lista final calculada una sola vez

  ngOnInit(): void {
    this.buildActionsList();
  }

  private buildActionsList(): void {
    const defaults: any[] = [];
  
    if (this.isEdit()) {
      defaults.push({
        type: 'default',
        ...this.actionEdit,
        action: () => this.editRow(this.row),
        disabled: this.actionEdit.disabled || false
      });
    }

    if (this.isCopy()) {
      defaults.push({
        type: 'default',
        ...this.actionCopy,
        action: () => {this.copyRow(this.row)},
        disabled: this.actionCopy.disabled || false
      });
    }
  
    if (this.isDelete()) {
      defaults.push({
        type: 'default',
        ...this.actionDelete,
        action: () => this.deleteRow(this.row),
        disabled: this.actionDelete.disabled || false
      });
    }
  
    if (this.isNavigate()) {
      defaults.push({
        type: 'default',
        ...this.actionNavigate,
        action: () => this.navigate.emit(this.row),
        disabled: this.actionNavigate.disabled || false
      });
    }
  
    if (this.isShow()) {
      defaults.push({
        type: 'default',
        ...this.actionShow,
        action: () => this.show.emit(this.row),
        disabled: this.actionShow.disabled || false
      });
    }
  
    // 🔹 Custom actions: usan "condicion" como "disabled"
    const customs =
      this.settings.customActions?.map(a => ({
        type: 'custom',
        ...a,
        action: () => a.action(this.row),
        disabled: a.condicion ? (row) => !this.evaluarCondicion(a.condicion, row, this.index) : false
      })) || [];
  
    this.allVisibleActions = [...defaults, ...customs];
  }
  

  evaluarCondicionDefault(condicion: Function | boolean, row: any): boolean {
    // Si no hay condición, se asume que NO está deshabilitado
    if (condicion === undefined || condicion === null) return false;
  
    // Si es un booleano, se usa directamente
    if (typeof condicion === 'boolean') return condicion;
  
    // Si es una función, la evaluamos con el row
    if (typeof condicion === 'function') {
      try {
        return condicion(row);
      } catch (error) {
        console.error('Error evaluando condición de disabled:', error);
        return false;
      }
    }
  
    // Por cualquier otro tipo inesperado, se asume habilitado
    return false;
  }
  evaluarCondicion(condicion, row: any, index: number): boolean {
    if (!condicion) return true; // Si no hay condición definida, se asume verdadera
    try {
      return condicion(row, index);
    } catch (error) {
      console.error('Error evaluando condición:', error);
      return false;
    }
  }

  isNavigate(): boolean {
    return this.findAccion('navegar');
  }
  isDelete(): boolean {
    return this.settings.editable && this.findAccion('delete');
  }
  isEdit(): boolean {
    return this.settings.editable && this.findAccion('editar');
  }
  isCopy(): boolean {
    return this.settings.editable && this.findAccion('copiar');
  }

  isShow(): boolean {
    return this.findAccion('show');
  }

  private findAccion(name: String): boolean {
    let action = undefined
    action = this.settings.defaultActions.actions.find(action => action.name === name);
    return action;
  }

  get actionEdit(): ActionDefault {
    let action = undefined
    action = this.findAccion('editar')
    return action;
  }
  get actionCopy(): ActionDefault {
    let action = undefined
    action = this.findAccion('copiar')
    return action;
  }
  get actionShow(): ActionDefault {
    let action = undefined
    action = this.findAccion('show')
    return action;
  }
  get actionNavigate(): ActionDefault {
    let action = undefined
    action = this.findAccion('navegar')
    return action;
  }
  get actionDelete(): ActionDefault {
    let action = undefined
    action = this.findAccion('delete')
    return action;
  }

  editRow(row) {
      this.edit.emit(row);
  }

  copyRow(row){
    this.copy.emit(row);
  }

  addEditConfirmed(row) {
    if (row.__isNew) this.addConfirm.emit(row);
    else this.editConfirm.emit(row);
  }

  editCancel(row){
    this.cancel.emit(row);
  }

  deleteRow(row) {
    this.delete.emit(row);
  }

}
