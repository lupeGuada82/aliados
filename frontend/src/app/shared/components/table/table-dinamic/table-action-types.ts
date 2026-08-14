// import { FormGroup } from '@angular/forms';

export interface InvalidResult {
  valid: false;
}

export interface EditConfirmResult {
  valid: true;
  oldRow: any;
  data: any;
  apply(updatedRow: any): void;
}

export type HandleEditConfirmResult =
  | InvalidResult
  | EditConfirmResult;


export interface AddConfirmResult {
  valid: true;
  newData: any;
  apply(newRowFromApi: any): void;
}

export type HandleAddConfirmResult =
  | InvalidResult
  | AddConfirmResult;


export interface DeleteConfirmResult {
  apply(): any[];
}


export interface CancelResult {
  apply(): void;
  readonly data: any[];
  readonly newRow: any;
}