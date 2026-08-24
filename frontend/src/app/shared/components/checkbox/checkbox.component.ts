import { booleanAttribute, Component, effect, ElementRef, input, output, viewChild } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  /** Estado (soporta [(checked)] two-way binding sin necesitar ControlValueAccessor/ngModel) */
  checked = input<boolean>(false);
  checkedChange = output<boolean>();

  /** No confundir con "sin marcar": es el tercer estado visual (ej: "algunos seleccionados") */
  indeterminate = input<boolean>(false);

  disabled = input<boolean>(false);

  /** Variante para usar sobre fondos de color (ej: header naranja de tabla) */
  onColor = input(false, { transform: booleanAttribute });

  id = `app-checkbox-${nextId++}`;

  private nativeInput = viewChild.required<ElementRef<HTMLInputElement>>('nativeInput');

  constructor() {
    // `indeterminate` no es un atributo HTML, es una propiedad que solo
    // se puede setear por JS en el elemento nativo — por eso no alcanza
    // con bindearlo en el template.
    effect(() => {
      this.nativeInput().nativeElement.indeterminate = this.indeterminate();
    });
  }

  onChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(isChecked);
  }
}