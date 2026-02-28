import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HelloService {

  private baseUrl = '/rest-api/hello';

  constructor(private http: HttpClient) {}

  hello(): Observable<string> {
    return this.http.get(this.baseUrl, { responseType: 'text' });
  }
  
}
