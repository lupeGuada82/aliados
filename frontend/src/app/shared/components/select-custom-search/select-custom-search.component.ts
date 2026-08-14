import {
  Component,
  effect,
  input,
  output,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-select-custom-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    // Material queda encapsulado dentro del componente
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './select-custom-search.component.html',
  styleUrl: './select-custom-search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectCustomSearchComponent,
      multi: true
    }
  ]
})
export class SelectCustomSearchComponent
  implements ControlValueAccessor {

  // ============================================================
  // Inputs
  // ============================================================

  selectPlaceholder = input<string>('Buscar...');
  placeholder = input<string>();
  options = input<any[]>([]);
  disabled = input(false);
  displaySelect = input(false);
  display = input<string>('display');
  value = input<string>('value');
  control = input<FormControl>(new FormControl([]));
  errorMsg = input<string>('Field is required');
  showErrorMsg = input(false);
  /**
   * Valores iniciales.
   */
  selectedOptions = input<any[]>();
  multiple = input(true);
  /**
   * Muestra tooltip cuando el texto no entra.
   */
  showTooltip = input(false);
  // ============================================================
  // UI
  // ============================================================
  labelCount = input<number>(1);
  appearance = input<'fill' | 'outline'>('outline');
  maxChips = input<number>(3);
  // ============================================================
  // Outputs
  // ============================================================
  onCloseChange = output<void>();
  // ============================================================
  // View
  // ============================================================
  @ViewChild('selectElem')
  selectElem?: MatSelect;
  // ============================================================
  // Estado interno
  // ============================================================
  filteredOptions: any[] = [];
  searchText = '';
  selectAllChecked = false;
  inputControl = new FormControl('');
  // ============================================================
  // Constructor
  // ============================================================

  constructor() {
    effect(() => {
      const control = this.control();
      if (this.disabled()) {
        control.disable({ emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
      this.filteredOptions = [...this.options()];
      const selectedOptions = this.selectedOptions();
      if (
        selectedOptions &&
        !control.value?.length
      ) {
        control.setValue(
          [...selectedOptions],
          { emitEvent: false }
        );
        this.onChange(control.value);
      }
      this.updateSelectAllState();
    });

  }

  // ============================================================
  // Selected value
  // ============================================================

  get selectedValue(): any[] {
    const value = this.control().value;
    if (this.multiple()) {
      return value || [];
    }
    return value;
  }

  set selectedValue(values: any[]) {
    this.control().setValue(values);
    this.onChange(values);
    this.updateSelectAllState();
  }

  // ============================================================
  // Select
  // ============================================================
  toggleDropdown(): void {
    this.selectElem?.toggle();
  }

  onClose(): void {
    this.onTouched();
    this.onCloseChange.emit();
  }

  onSelectionChange(event: any): void {
    this.selectedValue = event.value;
  }

  // ============================================================
  // Filter
  // ============================================================

  filterItem(value: string): void {
    this.searchText = value?.toLowerCase() || '';
    this.updateSelectAllState();
  }

  hideOption(option: any): boolean {
    if (!this.searchText) {
      return false;
    }
    const displayValue = option[this.display()];
    if (!displayValue) {
      return true;
    }
    return !displayValue
      .toString()
      .toLowerCase()
      .includes(this.searchText);
  }

  // ============================================================
  // Select all / deselect
  // ============================================================

  toggleSelectAll(): void {
    if (this.selectedValue.length > 0) {
      this.selectedValue = [];
    }
  }

  updateSelectAllState(): void {
    this.selectAllChecked =
      this.selectedValue.length > 0;
  }

  // ============================================================
  // Chips
  // ============================================================

  removeChip(value: any): void {
    this.selectedValue =
      this.selectedValue.filter(
        v => v !== value
      );
  }

  get visibleChips(): any[] {
    return this.selectedValue
      .slice(0, this.maxChips());
  }

  get hiddenChipsCount(): number {
    return Math.max(
      0,
      this.selectedValue.length - this.maxChips()
    );
  }

  getDisplayByValue(value: any): string {
    const option = this.options()
      .find(
        option =>
          option[this.value()] === value
      );
    if (!option) {
      return '';
    }
    return this.displaySelect()
      ? value
      : option[this.display()];
  }

  trackByFn(
    index: number,
    item: any
  ): any {
    return item[this.value()];
  }

  // ============================================================
  // ControlValueAccessor
  // ============================================================

  writeValue(value: any): void {
    this.control().setValue(
      value,
      { emitEvent: false }
    );
    this.updateSelectAllState();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const control = this.control();
    if (isDisabled) {
      control.disable({ emitEvent: false });
    } else {
      control.enable({ emitEvent: false });
    }
  }

  private onChange = (_: any): void => { };
  private onTouched = (): void => { };

}