import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(
    private http: HttpClient
  ) { }

  getContactos(urlEndpoint): Observable<any> {

    return this.http.get(urlEndpoint);

  }
}
