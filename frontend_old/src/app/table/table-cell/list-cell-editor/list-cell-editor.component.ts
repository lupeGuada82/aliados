import { Component } from "@angular/core";
import { DefaultEditor } from "../../utils/defaultEditor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'list-cell-editor',
  standalone: true,
  templateUrl: './list-cell-editor.component.html',
  styleUrls: ['./list-cell-editor.component.scss'],
  imports: [BrowserAnimationsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, CommonModule, MatIconModule]
})
export class ListCellEditor extends DefaultEditor {



}