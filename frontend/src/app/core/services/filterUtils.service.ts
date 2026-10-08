import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterUtils {

  normalizeFilter(filterValue: string): string {
    filterValue = filterValue.trim().toLowerCase();
    filterValue = filterValue
      .normalize('NFD')
      .replace(/[\u0300-\u0302\u0304-\u036f]/g, '') // todo el rango MENOS \u0303 (tilde de ñ)
      .normalize('NFC');
    return filterValue;
  }
}