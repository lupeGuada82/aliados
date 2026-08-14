import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DetalleStockService {

    baseUrl = '/rest-api';

    constructor(private http: HttpClient) { }

    getAll(path: string): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/' + path + '/');
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

    nuevoIngreso(codigo: number, ingresoStock: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + '/detalleStock/' + codigo + '/ingreso', ingresoStock);
    }

    nuevoEgreso(egresoStock: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + '/detalleStock/' + egresoStock.codigo + '/egreso', egresoStock);
    }

    editDetalleStock(detalleStock: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + '/detalleStock/', detalleStock);
    }

}