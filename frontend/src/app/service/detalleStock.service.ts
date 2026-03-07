import { HttpClient } from "@angular/common/http";
import { ApiURL } from "../../environments/enviroments";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';

//@Injectable() -- me dijo chatgp que lo cambie por el de abajo
@Injectable({ providedIn: 'root' })
export class DetalleStockService {

    baseUrl = '/rest-api';

    constructor(private http: HttpClient) { }
    
    getAll(path): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl +'/' + path + '/');
    }

    getProductoByCodigo(codigo: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/detalleStock/' + codigo);
    }

    getIngresos(codigo: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/detalleStock/' + codigo + '/ingresos');
    }

    getEngresos(codigo: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/detalleStock/' + codigo + '/egresos');
    }

    createDetalleStock(detalleStock: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/detalleStock/', detalleStock);
    }

   

  editDetalleStock(detalleStock: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + '/detalleStock/', detalleStock);
}

}