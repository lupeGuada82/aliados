import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive()
// usamos Directive abstract para que sea base de otros componentes
// Al utilizar los atributos como signal, tener en cuenta que a la hora de llamarlos es contol() (ejemplo)
export abstract class DefaultEditor {
  /** Control de la celda */
  control= input.required<FormControl>();//debería no ser null
  /** Fila completa */
  row = input<any>();
  /** Definición de la columna */
  column=input<any>();
  /**Parametros para un control **/
  parameters= input<any>();
}
