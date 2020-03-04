import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  deleteContactos(urlEndpoint: string, ids: string[]): Observable<any> {

    let httpParams = new HttpParams().set('ids', ids.join(','));
    let options = { params: httpParams };

    return this.http.delete(urlEndpoint, options);

  }

  deleteContacto(urlEndpoint: string, id: string): Observable<any> {

    return this.http.delete(`${urlEndpoint}/${id}`);

  }
}
