import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'stock-general',
    template: '<router-outlet></router-outlet>',
    styles: [''],
    imports: [
        RouterOutlet
    ],

})
export class StockGeneralComponent {
    constructor() { }

}