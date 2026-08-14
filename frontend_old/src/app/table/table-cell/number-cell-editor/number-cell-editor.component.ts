import { Component, EventEmitter, Output } from "@angular/core";
import { DefaultEditor } from "../../utils/defaultEditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'number-cell-editor',
  standalone: true,
  templateUrl: './number-cell-editor.component.html',
  styleUrls: ['./number-cell-editor.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule]
})
export class NumberCellEditor extends DefaultEditor {

  @Output() addEditConfirm = new EventEmitter<any>();


  addEditConfirmed() {
    this.addEditConfirm.emit();
  }
}