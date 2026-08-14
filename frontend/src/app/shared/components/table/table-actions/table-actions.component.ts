import { Component, input, output } from '@angular/core';
import { ActionDefault, TableConfiguration } from '../utils/utils';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { TABLE_ACTIONS } from '../helpers/constants';
import { IconComponent } from '../../icon/icon.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.scss',
  imports: [CommonModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTooltipModule, IconComponent, ButtonComponent]
})
export class TableActionsComponent {
  settings = input<TableConfiguration>(new TableConfiguration());
  row = input.required<any>();
  index = input.required<number>();
  // dataSource = input<MatTableDataSource<any>>(new MatTableDataSource<any>());
  isEditing = input(false);


  navigate = output<any>();
  show = output<any>();
  add = output<any>();
  edit = output<any>();
  delete = output<any>();
  cancel = output<any>();
  copy = output<any>();
  editConfirm = output<any>();
  addConfirm = output<any>();

  allVisibleActions: any[] = []; // 👈 lista final calculada una sola vez

  ngOnInit(): void {
    this.buildActionsList();
  }

  private buildActionsList(): void {
    const defaults: any[] = [];
    const row = this.row();
    if (this.isEdit()) {
      defaults.push({
        type: 'default',
        ...this.actionEdit,
        action: () => this.editRow(row),
        disabled: this.actionEdit?.disabled ?? false
      });
    }

    if (this.isCopy()) {
      defaults.push({
        type: 'default',
        ...this.actionCopy,
        action: () => { this.copyRow(row) },
        disabled: this.actionCopy?.disabled ?? false
      });
    }

    if (this.isDelete()) {
      defaults.push({
        type: 'default',
        ...this.actionDelete,
        action: () => this.deleteRow(row),
        disabled: this.actionDelete?.disabled ?? false
      });
    }

    if (this.isNavigate()) {
      defaults.push({
        type: 'default',
        ...this.actionNavigate,
        action: () => this.navigate.emit(row),
        disabled: this.actionNavigate?.disabled ?? false
      });
    }

    if (this.isShow()) {
      defaults.push({
        type: 'default',
        ...this.actionShow,
        action: () => this.show.emit(row),
        disabled: this.actionShow?.disabled ?? false
      });
    }

    // 🔹 Custom actions: usan "condicion" como "disabled"
    const customs =
      this.settings().customActions?.map(a => ({
        type: 'custom',
        ...a,
        action: () => a.action(row),
        disabled: a.condicion ? (row) => !this.evaluarCondicion(a.condicion, row, this.index()) : false
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
    return !!this.findAccion(TABLE_ACTIONS.NAVIGATE);
  }
  isDelete(): boolean {
    return this.settings().editable && !!this.findAccion(TABLE_ACTIONS.DELETE);
  }
  isEdit(): boolean {
    return this.settings().editable && !!this.findAccion(TABLE_ACTIONS.EDIT);
  }
  isCopy(): boolean {
    return this.settings().editable && !!this.findAccion(TABLE_ACTIONS.COPY);
  }

  isShow(): boolean {
    return !!this.findAccion(TABLE_ACTIONS.SHOW);
  }

  private findAccion(name: string): ActionDefault | undefined {
    let action = this.settings().defaultActions.actions.find(action => action.name === name);
    return action;
  }

  get actionEdit(): ActionDefault | undefined {
    let action = this.findAccion(TABLE_ACTIONS.EDIT);
    return action;
  }
  get actionCopy(): ActionDefault | undefined {
    let action = this.findAccion(TABLE_ACTIONS.COPY);
    return action;
  }
  get actionShow(): ActionDefault | undefined {
    let action = this.findAccion(TABLE_ACTIONS.SHOW);
    return action;
  }
  get actionNavigate(): ActionDefault | undefined {
    let action = this.findAccion(TABLE_ACTIONS.NAVIGATE);
    return action;
  }
  get actionDelete(): ActionDefault | undefined {
    let action = this.findAccion(TABLE_ACTIONS.DELETE);
    return action;
  }

  editRow(row) {
    this.edit.emit(row);
  }

  copyRow(row) {
    this.copy.emit(row);
  }

  addEditConfirmed(row) {
    if (row.__isNew) this.addConfirm.emit(row);
    else this.editConfirm.emit(row);
  }

  editCancel(row) {
    this.cancel.emit(row);
  }

  deleteRow(row) {
    this.delete.emit(row);
  }

}
