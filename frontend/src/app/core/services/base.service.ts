import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiURL } from "../../../environments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  baseUrl = ApiURL;



  constructor(private http: HttpClient) { }

  getAll(path: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + path);
  }

  getById(id: number, path: string) {
    return this.http.get<any>(this.baseUrl + path + id);
  }

  add(path: string, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(this.baseUrl + path, body, { headers: headers });
  }


  update(path: string, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(this.baseUrl + path, body, { headers: headers });
  }

  getByCodigo(codigo: number, path: string) {
    return this.http.get<any>(this.baseUrl + path + codigo);
  }
  getByDescripcion(search: String, path: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl + path + 'bySearchDescripcion', search, { headers: headers })

  }

}

