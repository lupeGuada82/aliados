
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColumnSetting } from '../utils/utils';

@Component({
    selector: 'column-visibility-selector',
    templateUrl: './column-visibility-selector.component.html',
    styleUrl: './column-visibility-selector.component.scss',
    imports: [FormsModule, MatCheckboxModule]
})
export class ColumnVisibilitySelectorComponent {
  columns= input<ColumnSetting[]>([]) ;

}
