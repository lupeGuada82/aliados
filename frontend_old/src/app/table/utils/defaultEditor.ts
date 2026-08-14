import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive()
// usamos Directive abstract para que sea base de otros componentes
export abstract class DefaultEditor {
  /** Control de la celda */
  @Input() control!: FormControl | null;

  /** Fila completa */
  @Input() row: any;

  /** Definición de la columna */
  @Input() column: any;

  /**Parametros para un control **/
  @Input() parameters:any;

}
