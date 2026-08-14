import { inject, Injectable } from "@angular/core";
import { TableFormService } from "./table-form.service";
import { TableStateService } from "./table-state.service";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ColumnSetting, TableConfiguration } from "../utils/utils";
import {
  HandleEditConfirmResult, HandleAddConfirmResult,
  DeleteConfirmResult,
  CancelResult
} from "../table-dinamic/table-action-types";

@Injectable()
export class TableActionService {

  private tableFormService = inject(TableFormService);
  private tableStateService = inject(TableStateService);

  handleEditConfirm(params: {
    row: any,
    form: FormGroup,
    columns: ColumnSetting[],
    formArray?: FormArray,
    isUsingFormArray: boolean
  }): HandleEditConfirmResult {
    const { row, form, columns, formArray, isUsingFormArray } = params;

    const oldRow = structuredClone(row);

    form.markAllAsTouched();

    if (!form.valid) {
      return { valid: false };
    }

    const data = {
      ...row,
      ...form.value
    };

    return {
      valid: true,
      oldRow,
      data,
      apply: (updatedRow: any) => {
        const finalRow = {
          ...updatedRow,
          __uid: row.__uid
        };

        this.tableFormService.deleteForm(row.__uid);
        this.tableFormService.mergeRow(row, finalRow, columns);

        if (isUsingFormArray && formArray) {
          this.tableFormService.updateFormArrayRow(formArray, finalRow);
        }

        this.tableFormService.createForm(row, columns);

        this.tableStateService.stopEditing(row);
        this.tableStateService.clearOriginal(row);
      }
    };
  }

  handleAddConfirm(params: {
    row: any,
    form: FormGroup,
    columns: ColumnSetting[],
    formArray?: FormArray,
    isUsingFormArray: boolean
  }): HandleAddConfirmResult {
    const { row, form, columns, formArray, isUsingFormArray } = params;

    if (!form.valid) {
      form.markAllAsTouched();
      return { valid: false };
    }

    const newData = {
      ...row,
      ...form.value
    };

    return {
      valid: true,
      newData,
      apply: (newRowFromApi: any) => {

        const finalRow = {
          ...newRowFromApi,
          __uid: row.__uid
        };

        if (isUsingFormArray && formArray) {
          formArray.push(
            new FormGroup(
              Object.keys(finalRow)
                .filter(k => k !== '__isNew')
                .reduce((acc, key) => {
                  acc[key] = new FormControl(finalRow[key]);
                  return acc;
                }, {})
            )
          );
        }

        this.tableFormService.deleteForm(row.__uid);

        columns
          .filter(c => c.key !== 'acciones')
          .forEach(c => {
            row[c.key] = finalRow[c.key];
          });

        delete row.__isNew;

        this.tableFormService.createForm(row, columns);

        this.tableStateService.stopAdding(row);
        this.tableStateService.stopEditing(row);
        this.tableStateService.clearOriginal(row);
      }
    };
  }

  handleDeleteConfirm(params: {
    row: any,
    data: any[],
    formArray?: FormArray,
    isUsingFormArray: boolean
  }): DeleteConfirmResult {
    const { row, data, formArray, isUsingFormArray } = params;

    return {
      apply: () => {

        const newData = data.filter(r => r.__uid !== row.__uid);

        this.tableFormService.deleteForm(row.__uid);

        // Limpieza de estado
        this.tableStateService.stopEditing(row);
        this.tableStateService.stopAdding(row);
        this.tableStateService.clearOriginal(row);

        if (isUsingFormArray && formArray) {
          const index = formArray.controls.findIndex(
            ctrl => ctrl?.value.__uid === row.__uid
          );

          if (index > -1) {
            formArray.removeAt(index);
          }
        }

        return newData;
      }
    };
  }

  handleCancel(params: {
    row: any;
    data: any[];
    formArray?: FormArray;
    isUsingFormArray: boolean;
  }): CancelResult {
    const { row, data, formArray, isUsingFormArray } = params;

    let newData = [...data];
    let newRowRef = null;

    return {
      apply: () => {

        if (row.__isNew) {

          newData = newData.filter(r => r !== row);

          if (isUsingFormArray && formArray) {
            const index = formArray.controls.findIndex(
              ctrl => ctrl?.value.__uid === row.__uid
            );
            if (index > -1) {
              formArray.removeAt(index);
            }
          }

          this.tableFormService.deleteForm(row.__uid);
          this.tableStateService.stopAdding(row);

          newRowRef = null;

        } else {
          const original = this.tableStateService.getOriginal(row);
          const fg = this.tableFormService.getForm(row.__uid);

          if (original) {
            Object.assign(row, original);
          }

          if (fg && Object.keys(fg.controls).length > 0) {
            fg.patchValue(
              Object.fromEntries(
                Object.keys(fg.controls).map(k => [k, original?.[k] ?? null])
              )
            );
          }
        }

        this.tableStateService.stopEditing(row);
        this.tableStateService.clearOriginal(row);
      },

      get data() {
        return newData;
      },

      get newRow() {
        return newRowRef;
      }
    };
  }

  disableGeneralAction(settings: TableConfiguration): void {
    for (const col of settings.columns) {
      col.visible = true;
    }
    settings.applyConfigExport({ disabled: true });
    settings.applyConfigHide({ disabled: true });
  }

  enableGeneralAction(settings: TableConfiguration): void {
    if (!this.tableStateService.hasEditing()) {
      settings.applyConfigExport({ disabled: false });
      settings.applyConfigHide({ disabled: false });
    }
  }

}