import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TextCellEditor } from './text-cell-editor/text-cell-editor.component';
import { NumberCellEditor } from './number-cell-editor/number-cell-editor.component';
import { ListCellEditor } from './list-cell-editor/list-cell-editor.component';
import { CustomCellEditor } from './custom-cell-editor/custom-cell-editor.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColumnSetting } from '../utils/utils';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  imports: [CommonModule, TextCellEditor, NumberCellEditor, ListCellEditor, CustomCellEditor, MatFormFieldModule]
})
export class TableCellComponent {

  @Input() column: any;
  @Input() row: any;
  @Input() formGroup: FormGroup | null = null;
  @Input() isEditing: boolean = false;
  @Input() settings: any;

  @Output() editConfirm = new EventEmitter<any>();
  @Output() addConfirm = new EventEmitter<any>();

  getCellClass(): string | undefined {
    return this.column?.cellClass?.(this.row);
  }

  // getter seguro: devuelve AbstractControl | null
  get control(): AbstractControl | null {
    return this.formGroup ? this.formGroup.get(this.column.key) : null;
  }

    get parameters(): any | null {
    return this.column ? this.column.editor.parameters : null;
  }
  errorKeys(errors: any): string[] {
    return errors ? Object.keys(errors) : [];
  }

  isFormControl(ctrl: AbstractControl | null): ctrl is FormControl {
    return ctrl instanceof FormControl;
  }

  addEditConfirmed() {
    if (this.row.__isNew) this.addConfirm.emit(this.row);
    else this.editConfirm.emit(this.row);
  }

  isColumnEditable(column: ColumnSetting, row: any): boolean {
    let result = false;
    if (!column.editor || !this.formGroup) result = false;
    if (row.__isNew) {
      result = typeof column.isAddable === 'function'
        ? column.isAddable(this.formGroup.value)
        : column.isAddable;
    } else {
      result = typeof column.isEditable === 'function'
        ? column.isEditable(this.formGroup.value)
        : column.isEditable;
    }
    if (this.isEditing && this.control.value !== row[column.key] && !result)
      this.control.setValue(row[column.key]);
    return result
  }
}
