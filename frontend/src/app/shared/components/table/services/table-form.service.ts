import { inject, Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { ColumnSetting } from "../utils/utils";
import { RowIdentityService } from "./row-identity-service";

@Injectable()
export class TableFormService {

  private rowIdentity = inject(RowIdentityService);

  private formGroups = new Map<string, FormGroup>();

  createForm(row: any, columns: ColumnSetting[]): FormGroup {
    const group: any = {};

    columns.forEach(col => {
      if (col.key !== 'acciones') {
        group[col.key] = new FormControl(
          row[col.key],
          col.editor?.validators || []
        );
      }
    });

    const groupValidators: ValidatorFn[] = columns.flatMap(
      c => c.editor?.groupValidators || []
    );

    const fg = new FormGroup(group, { validators: groupValidators });

    this.formGroups.set(row.__uid, fg);
    return fg;
  }

  getForm(uid: string): FormGroup | undefined {
    return this.formGroups.get(uid);
  }

  deleteForm(uid: string) {
    this.formGroups.delete(uid);
  }

  clear() {
    this.formGroups.clear();
  }

  initializeFromFormArray(params: {
    formArray: FormArray<FormGroup>,
    columns: ColumnSetting[]
  }) {
    const { formArray, columns } = params;
  
    formArray.controls.forEach((control) => {
  
      // 👇 IMPORTANTE: trabajar sobre el control, no sobre value
      if (!control.get('__uid')) {
        const uid = this.generateUID(control.value); // 👈 MISMA lógica
        control.addControl('__uid', new FormControl(uid));
      }
  
      const value = control.value;
  
      if (!this.getForm(value.__uid)) {
        this.createForm(value, columns);
      }
    });
  }
  generateUID(row: any) {
    return this.rowIdentity.generate(row);
  }

  syncToFormArray(data: any[], formArray: FormArray) {
    formArray.clear();

    data.forEach(row => {
      const fg = this.formGroups.get(row.__uid);
      if (fg) {
        formArray.push(
          new FormGroup({
            ...fg.controls,
            __uid: new FormControl(row.__uid)
          })
        );
      }
    });
  }

  updateFormArrayRow(formArray: FormArray, row: any) {
    const index = formArray.controls.findIndex(
      ctrl => ctrl.value.__uid === row.__uid
    );

    if (index !== -1) {
      formArray.setControl(
        index,
        new FormGroup(
          Object.keys(row)
            .filter(k => k !== '__isNew')
            .reduce((acc, key) => {
              acc[key] = new FormControl(row[key]);
              return acc;
            }, {})
        )
      );
    }
  }

  mergeRow(target: any, source: any, columns: ColumnSetting[]) {
    columns
      .filter(c => c.key !== 'acciones')
      .forEach(c => {
        target[c.key] = source[c.key];
      });
  }
}