import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersentsService {

  link = 'http://localhost:3000/api/persent';

  constructor( private http: HttpClient) { }

  public getPersent(): Observable<any> {
    return this.http.get<any>( this.link + 's' );
  }

  public createPersent(data): Observable<any> {
    return this.http.post<any>(this.link, JSON.stringify(data));
  }

  public editPersent(data): Observable<any> {
    return this.http.put<any>(this.link + '/' + data._id, data);
  }

  public deletePersent(data): Observable<any> {
    return this.http.delete<any>(this.link + '/' + data._id, data); // .map(res => null);
  }
}
