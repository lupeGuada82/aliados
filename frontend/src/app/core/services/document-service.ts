import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  descripcion: string;
  cantidad: number;
  unidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  baseUrl = '/rest-api';

  private readonly http = inject(HttpClient);

  procesarArchivo(file: File): Observable<string> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(this.baseUrl + '/documentos/procesar',
      formData,
      {
        responseType: 'text'
      }
    );
  }
}