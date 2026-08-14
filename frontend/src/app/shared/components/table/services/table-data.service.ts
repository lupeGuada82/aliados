import { inject, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray } from '@angular/forms';
import { RowIdentityService } from './row-identity-service';

@Injectable()
export class TableDataService<T extends { __uid?: string }> {

  private rowIdentity = inject(RowIdentityService);

  buildSource(
    source: T[] | MatTableDataSource<T> | null | undefined,
    formArray?: FormArray,
    existingDataSource?: MatTableDataSource<T>
  ): MatTableDataSource<T> {

    if (formArray) {
      return this.fromFormArray(formArray, existingDataSource);
    }

    return this.fromSource(source, existingDataSource);
  }

  // =========================
  // SOURCE NORMAL
  // =========================
  private fromSource(
    source: T[] | MatTableDataSource<T> | null | undefined,
    existing?: MatTableDataSource<T>
  ): MatTableDataSource<T> {

    const ds = existing ?? new MatTableDataSource<T>();
    const currentData = ds.data ?? [];

    let incomingData: T[] = [];

    if (source instanceof MatTableDataSource) {
      incomingData = source.data ?? [];
    } else if (Array.isArray(source)) {
      incomingData = source;
    }

    ds.data = incomingData.map(row => {
      const existingRow = currentData.find(r => r.__uid === row.__uid);

      // 🔥 mantener referencia si ya existe
      if (existingRow) {
        return existingRow;
      }

      return {
        ...row,
        __uid: row.__uid ?? this.generateUID(row)
      };
    });

    return ds;
  }

  // =========================
  // FORM ARRAY
  // =========================
  private fromFormArray(
    formArray: FormArray,
    existing?: MatTableDataSource<T>
  ): MatTableDataSource<T> {

    const ds = existing ?? new MatTableDataSource<T>();
    const currentData = ds.data ?? [];

    const incomingData = formArray.value ?? [];

    ds.data = incomingData.map((row: T) => {
      const existingRow = currentData.find(r => r.__uid === row.__uid);

      // 🔥 mantener referencia si ya existe
      if (existingRow) {
        return existingRow;
      }

      return {
        ...row,
        __uid: row.__uid ?? this.generateUID(row)
      };
    });

    return ds;
  }

  // =========================
  // UID ESTABLE
  // =========================
  private generateUID(row: any): string {
    return this.rowIdentity.generate(row);
  }
}