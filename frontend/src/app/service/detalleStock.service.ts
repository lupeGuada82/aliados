import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()// -- me dijo chatgp que lo cambie por el de abajo
// @Injectable({ providedIn: 'root' })  hayq ue tener cuidado porque si se pone asi, se crea una instancia global del servicio, y si se pone solo @Injectable(), se crea una instancia por cada componente que lo use, lo cual es mejor para evitar problemas de concurrencia y de memoria
export class DetalleStockService {

    baseUrl = '/rest-api';

    constructor(private http: HttpClient) { }
    
    getAll(path): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl +'/' + path + '/');
    }

    getProductoByCodigo(codigo: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/detalleStock/' + codigo);
    }

    createDetalleStock(detalleStock: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/detalleStock/', detalleStock);
    }

   

  editDetalleStock(detalleStock: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + '/detalleStock/', detalleStock);
}

}