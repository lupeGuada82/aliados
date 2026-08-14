import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export interface TableValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateFormArray(formArray: any): TableValidationResult {
  const errors: string[] = [];

  // =========================
  // VALIDACIÓN BASE
  // =========================
  if (!(formArray instanceof FormArray)) {
    errors.push('[Table] El valor recibido no es un FormArray válido.');
    return buildResult(errors);
  }

  // =========================
  // VALIDAR FILAS
  // =========================
  formArray.controls.forEach((control: AbstractControl, rowIndex: number) => {

    if (!(control instanceof FormGroup)) {
      errors.push(
        `[Table] El elemento en la posición ${rowIndex} debe ser un FormGroup.`
      );
      return;
    }

    // =========================
    // VALIDAR CONTROLES
    // =========================
    Object.entries(control.controls).forEach(([field, fieldControl]) => {

      if (hasValidators(fieldControl)) {
        errors.push(
          `[Table] El control '${field}' en la fila ${rowIndex} ya tiene validators definidos. ` +
          `Los validators deben configurarse desde 'columns.editor.validators'.`
        );
      }

    });

  });

  return buildResult(errors);
}

// =========================
// HELPERS
// =========================

function hasValidators(control: AbstractControl): boolean {
  return !!control.validator || !!control.asyncValidator;
}

function buildResult(errors: string[]): TableValidationResult {
  return {
    valid: errors.length === 0,
    errors
  };
}