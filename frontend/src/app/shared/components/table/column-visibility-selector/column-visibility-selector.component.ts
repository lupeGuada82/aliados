import { Component, input } from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { ColumnSetting } from '../utils/utils';

@Component({
    selector: 'column-visibility-selector',
    templateUrl: './column-visibility-selector.component.html',
    styleUrl: './column-visibility-selector.component.scss',
    imports: [CheckboxComponent]
})
export class ColumnVisibilitySelectorComponent {
  columns= input<ColumnSetting[]>([]) ;

}