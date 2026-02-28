import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  DoCheck
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "mat-select-autocomplete-search",
  templateUrl: "./select-autocomplete.component.html",
  styleUrls: ["./select-autocomplete.component.css"]

})
export class SelectAutocompleteSearchComponent implements OnChanges, DoCheck {
  @Input() selectPlaceholder: string = "Buscar...";
  @Input() placeholder: string;
  @Input() options;
  @Input() disabled = false;
  @Input() display = "display";
  @Input() value = "value";
  @Input() formControl: FormControl = new FormControl();
  @Input() errorMsg: string = "Field is required";
  @Input() showErrorMsg = false;
  @Input() selectedOptions;
  @Input() multiple = true;

  // New Options
  @Input() labelCount: number = 1;
  @Input() appearance:  "fill" | "outline" = "outline";

  @Output()
  selectionChange: EventEmitter<any> = new EventEmitter();
  @Output()
  onCloseChange: EventEmitter<any> = new EventEmitter();
  @Input("data-cy") dataCy = 'selectPrueba';

  @ViewChild("selectElem", { static: true }) selectElem;

  @Input() maxChips = 2;


  filteredOptions: Array<any> = [];
  selectedValue: Array<any> = [];
  selectAllChecked = false;
  displayString = "";
  inputGroup:FormGroup;
  constructor(private fb: FormBuilder) { 
    this.inputGroup = this.fb.group({
      inputControl: [],
    });
  }

  ngOnChanges() {
    if (this.disabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
    this.filteredOptions = this.options;
    if (this.selectedOptions) {
      this.selectedValue = this.selectedOptions;
    } else if (this.formControl.value) {
      this.selectedValue = this.formControl.value;
    }
  }

  ngDoCheck() {
    if (!this.selectedValue.length) {
      this.selectionChange.emit(this.selectedValue);
    }
  }

  toggleDropdown() {
    this.selectElem.toggle();
  }

  toggleSelectAll(val) {
    if (val.checked) {
      this.filteredOptions.forEach(option => {
        if (!this.selectedValue.includes(option[this.value])) {
          this.selectedValue = this.selectedValue.concat([option[this.value]]);
        }
      });
    } else {
      const filteredValues = this.getFilteredOptionsValues();
      this.selectedValue = this.selectedValue.filter(
        item => !filteredValues.includes(item)
      );
    }
    this.selectionChange.emit(this.selectedValue);
  }

  filterItem(value) {
    this.filteredOptions = this.options.filter(
      item => item[this.display].toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.selectAllChecked = true;
    this.filteredOptions.forEach(item => {
      if (!this.selectedValue.includes(item[this.value])) {
        this.selectAllChecked = false;
      }
    });
    if (!this.filteredOptions.length) {
      this.selectAllChecked = false;
    }
  }

  hideOption(option) {
    return !(this.filteredOptions.indexOf(option) > -1);
  }

  // Returns plain strings array of filtered values
  getFilteredOptionsValues() {
    const filteredValues = [];
    this.filteredOptions.forEach(option => {
      filteredValues.push(option.value);
    });
    return filteredValues;
  }

  onDisplayString() {
    this.displayString = "";
    if (this.selectedValue && this.selectedValue.length) {
      let displayOption = [];
      if (this.multiple) {
        // Multi select display
        for (let i = 0; i < this.labelCount; i++) {
          displayOption[i] = this.options.filter(
            option => option[this.value] === this.selectedValue[i]
          )[0];
        }
        if (displayOption.length) {
          for (let i = 0; i < displayOption.length; i++) {
            if (displayOption[i] && displayOption[i][this.display]) {
              this.displayString += displayOption[i][this.display] + ",";
            }
          }
          this.displayString = this.displayString.slice(0, -1);
          if (
            this.selectedValue.length > 1 &&
            this.selectedValue.length > this.labelCount
          ) {
            this.displayString += ` (+${this.selectedValue.length -
              this.labelCount} más)`;
          }
        }
      } else {
        // Single select display
        displayOption = this.options.filter(
          option => option[this.value] === this.selectedValue
        );
        if (displayOption.length) {
          this.displayString = displayOption[0][this.display];
        }
      }
    }
    return this.displayString;
  }

  onSelectionChange(val) {
    const filteredValues = this.getFilteredOptionsValues();
    let count = 0;
    if (this.multiple) {
      this.selectedValue.filter(item => {
        if (filteredValues.includes(item)) {
          count++;
        }
      });
      this.selectAllChecked = count === this.filteredOptions.length;
    }
    this.selectedValue = val.value;
    this.selectionChange.emit(this.selectedValue);
  }

  public trackByFn(index, item) {
    return item.value;
  }


  /* nuevo evento para cuando cierra el panel */
  onClose() {
    this.onCloseChange.emit();
  }

  getDataCy() {
    return this.dataCy;
  }

  get inputControl() {
    return this.inputGroup.get('inputControl');
  }

  getDisplayByValue(value: any): string {
  const opt = this.options?.find(o => o[this.value] === value);
  return opt ? opt[this.display] : value;
}

removeChip(value: any) {
  this.selectedValue = this.selectedValue.filter(v => v !== value);
  this.formControl.setValue(this.selectedValue);
  this.selectionChange.emit(this.selectedValue);
}

get visibleChips() {
  return this.selectedValue?.slice(0, this.maxChips) || [];
}

get hiddenChipsCount() {
  if (!this.selectedValue) return 0;
  return Math.max(0, this.selectedValue.length - this.maxChips);
}


}


