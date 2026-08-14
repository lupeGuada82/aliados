import { Component, output } from "@angular/core";
import { DefaultEditor } from "../../utils/defaultEditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'number-cell-editor',
  templateUrl: './number-cell-editor.component.html',
  styleUrls: ['./number-cell-editor.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule]
})
export class NumberCellEditor extends DefaultEditor {

  addEditConfirm = output<void>();

  addEditConfirmed() {
    this.addEditConfirm.emit();
  }
}