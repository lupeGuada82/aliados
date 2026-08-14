import { Component, effect, input, output, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'select-custom-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule,
    ButtonComponent
  ],
  templateUrl: './select-custom-table.component.html',
  styleUrls: ['./select-custom-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectCustomEditorComponent,
      multi: true
    }
  ]
})
export class SelectCustomEditorComponent implements ControlValueAccessor {

  // ===========================
  // Inputs
  // ===========================

  selectPlaceholder = input<string>('Buscar...');
  options = input<any[]>([]);
  disabled = input(false);

  displayFn = input.required<(option: any) => string>();
  displaySelectFn = input.required<(option: any) => string>();
  valueFn = input.required<(option: any) => any>();

  control = input.required<FormControl>();

  showTooltip = input(false);

  // UI options
  appearance = input<'fill' | 'outline'>('outline');


  // ===========================
  // Outputs
  // ===========================

  onCloseChange = output<void>();


  // ===========================
  // ViewChild
  // ===========================

  @ViewChild('selectElem', { static: true })
  selectElem: any;


  // ===========================
  // Estado
  // ===========================

  filteredOptions: any[] = [];
  searchText = '';
  selectAllChecked = false;

  // Control del input de búsqueda
  inputControl = new FormControl('');


  // ===========================
  // Constructor
  // ===========================

  constructor() {

    effect(() => {
      this.filteredOptions = [...this.options()];
    });

    effect(() => {
      if (this.disabled()) {
        this.control().disable();
      } else {
        this.control().enable();
      }
    });

  }


  // ===========================
  // Valor seleccionado
  // ===========================

  get selectedValue(): any[] {
    return this.control().value ?? null;
  }

  set selectedValue(values: any) {
    this.control().setValue(values);
    this.onChange(values);
  }


  // ===========================
  // Select
  // ===========================

  toggleDropdown(): void {
    this.selectElem.toggle();
  }

  onClose(): void {
    this.onTouched();
    this.onCloseChange.emit();
  }

  onSelectionChange(event: any): void {
    this.selectedValue = event.value;
  }


  // ===========================
  // Filtro
  // ===========================

  filterItem(value: string): void {
    this.searchText = value?.toLowerCase() || '';
  }

  hideOption(option: any): boolean {

    if (!this.searchText) {
      return false;
    }

    const text = this.displayFn()(option)
      .toString()
      .toLowerCase();

    return !text.includes(this.searchText);
  }

  trackByFn(index: number, item: any): any {
    return this.valueFn()(item);
  }


  // ===========================
  // Limpiar búsqueda
  // ===========================

  protected clearSearch(): void {
    this.inputControl.setValue('');
    this.filterItem('');
  }


  // ===========================
  // ControlValueAccessor
  // ===========================

  writeValue(obj: any): void {
    this.control().setValue(obj, {
      emitEvent: false
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control().disable();
    } else {
      this.control().enable();
    }
  }


  // ===========================
  // ControlValueAccessor callbacks
  // ===========================

  private onChange = (_: any) => { };
  private onTouched = () => { };

}

