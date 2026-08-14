import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "select-autocomplete-chips",
  templateUrl: "./select-autocomplete-chips.component.html",
  styleUrls: ["./select-autocomplete-chips.component.css"]
})
export class SelectAutocompleteChipComponent implements OnChanges {

  @Input() selectPlaceholder: string = "Buscar...";
  @Input() placeholder: string;
  @Input() options: any[] = [];
  @Input() disabled = false;
  @Input() display = "display";
  @Input() value = "value";
  @Input() formControl: FormControl = new FormControl([]);
  @Input() errorMsg: string = "Field is required";
  @Input() showErrorMsg = false;
  @Input() selectedOptions: any[]; ///esto solo utilizarlo para un valor inicial
  @Input() multiple = true;

  // UI options
  @Input() labelCount: number = 1;
  @Input() appearance: "fill" | "outline" = "outline";
  @Input() maxChips = 2;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() onCloseChange = new EventEmitter<any>();
  @Input("data-cy") dataCy = "selectPrueba";

  @ViewChild("selectElem", { static: true }) selectElem;

  filteredOptions: any[] = [];
  selectAllChecked = false;
  displayString = "";

  // Input de búsqueda
  inputControl = new FormControl("");

  /* ============================= */

  ngOnChanges() {
    if (this.disabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }

    this.filteredOptions = this.options || [];

    // inicializar desde selectedOptions SOLO si el formControl está vacío
    if (this.selectedOptions && !this.formControl.value?.length) {
      this.formControl.setValue(this.selectedOptions);
    }
  }

  /* ============================= */
  /* === Valores seleccionados === */

  get selectedValue(): any[] {
    return this.formControl.value || [];
  }

  /* ============================= */

  toggleDropdown() {
    this.selectElem.toggle();
  }

  onClose() {
    this.onCloseChange.emit();
  }

  onSelectionChange(event: any) {
    const value = event.value;
    this.formControl.setValue(value);
    this.selectionChange.emit(value);
    this.updateSelectAllState();
  }

  /* ============================= */
  /* ======== Filtro ============= */

  filterItem(value: string) {
    const search = value?.toLowerCase() || "";

    this.filteredOptions = this.options.filter(opt =>
      opt[this.display]?.toLowerCase().includes(search)
    );

    this.updateSelectAllState();
  }

  /* ============================= */
  /* ===== Select All ============ */

  toggleSelectAll(event: any) {
    if (event.checked) {
      const values = this.filteredOptions.map(o => o[this.value]);
      const merged = [...new Set([...this.selectedValue, ...values])];
      this.formControl.setValue(merged);
      this.selectionChange.emit(merged);
    } else {
      const filteredValues = this.filteredOptions.map(o => o[this.value]);
      const remaining = this.selectedValue.filter(v => !filteredValues.includes(v));
      this.formControl.setValue(remaining);
      this.selectionChange.emit(remaining);
    }

    this.updateSelectAllState();
  }

  private updateSelectAllState() {
    if (!this.filteredOptions.length) {
      this.selectAllChecked = false;
      return;
    }

    const filteredValues = this.filteredOptions.map(o => o[this.value]);
    this.selectAllChecked = filteredValues.every(v => this.selectedValue.includes(v));
  }

  /* ============================= */
  /* ========= Chips ============ */

  removeChip(value: any) {
    const updated = this.selectedValue.filter(v => v !== value);
    this.formControl.setValue(updated);
    this.selectionChange.emit(updated);
    this.updateSelectAllState();
  }

  get visibleChips() {
    return this.selectedValue.slice(0, this.maxChips);
  }

  get hiddenChipsCount() {
    return Math.max(0, this.selectedValue.length - this.maxChips);
  }

  /* ============================= */

  getDisplayByValue(value: any): string {
    const opt = this.options?.find(o => o[this.value] === value);
    return opt ? opt[this.display] : value;
  }

  trackByFn(index: number, item: any) {
    return item[this.value];
  }

  getDataCy() {
    return this.dataCy;
  }
}
