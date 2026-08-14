import { Component, output } from "@angular/core";
import { DefaultEditor } from "../../utils/defaultEditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'text-cell-editor',
  templateUrl: './text-cell-editor.component.html',
  styleUrls: ['./text-cell-editor.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule]
})
export class TextCellEditor extends DefaultEditor {

  addEditConfirm = output<void>();

  addEditConfirmed() {
    this.addEditConfirm.emit();
  }
}