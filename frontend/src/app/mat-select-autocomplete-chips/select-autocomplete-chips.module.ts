import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectAutocompleteChipComponent } from './select-autocomplete-chips.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [SelectAutocompleteChipComponent],
  exports: [SelectAutocompleteChipComponent]
})
export class SelectAutocompleteChipModule { }
