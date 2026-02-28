import { Component } from "@angular/core";

import { Title } from "@angular/platform-browser";
export interface Item {
  id: number;
  label: string;
}

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  showError = false;
  errorMessage = '';
  constructor() {
  }
  ngOnInit(): void {

  }
  frutas = [
    { value: 1, display: 'Apple' },
    { value: 2, display: 'Banana' },
    { value: 3, display: 'Orange' },
    { value: 3, display: 'Orange' },
    { value: 3, display: 'Orange' },
    { value: 3, display: 'Orange' }
  ];

  onSelectionChange(selected: Item[]) {
    console.log('Seleccionados:', selected);
  }
}