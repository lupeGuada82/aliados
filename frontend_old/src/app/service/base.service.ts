import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiURL } from "../../environments/enviroments";

@Injectable()
export class BaseService<T> {

  baseUrl = ApiURL;



  constructor(private http: HttpClient) { }

  getAll(path): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + path);
  }

  getById(id: number, path: String) {
    return this.http.get<any>(this.baseUrl + path + id);
  }

  add(path: String, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(this.baseUrl + path, body, { headers: headers });
  }


  update(path: String, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(this.baseUrl + path, body, { headers: headers });
  }
 
  getByCodigo(codigo: number, path: String) {
    return this.http.get<any>(this.baseUrl + path + codigo);
  }
}

