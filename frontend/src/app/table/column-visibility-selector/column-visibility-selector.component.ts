import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'column-visibility-selector',
  standalone: true,
  templateUrl: './column-visibility-selector.component.html',
  styleUrl: './column-visibility-selector.component.scss', 
  imports: [ CommonModule, FormsModule, MatCheckboxModule]
})
export class ColumnVisibilitySelectorComponent {
  @Input() columns: { label: string; visible: boolean }[] = [];
}
