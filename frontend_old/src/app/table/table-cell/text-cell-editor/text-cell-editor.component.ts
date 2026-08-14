import { Component, EventEmitter, Output } from "@angular/core";
import { DefaultEditor } from "../../utils/defaultEditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'text-cell-editor',
  standalone: true,
  templateUrl: './text-cell-editor.component.html',
  styleUrls: ['./text-cell-editor.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule]
})
export class TextCellEditor extends DefaultEditor {

  @Output() addEditConfirm = new EventEmitter<any>();

  addEditConfirmed() {
    this.addEditConfirm.emit();
  }
}