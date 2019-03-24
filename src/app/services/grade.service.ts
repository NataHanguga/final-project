import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  link = 'http://localhost:3000/api/propert';

  constructor( private http: HttpClient) { }

  public getGrades(): Observable<any> {
    return this.http.get<any>( this.link + 'ies' );
  }

  public getDataForTable(): Observable<any> {
    return this.http.get<any>( this.link + 'ies/forTable' );
  }

  public getSummProp(): Observable<any> {
    return this.http.get<any>( this.link + 'ies/summPropList' );
  }

  public getSummMaterList(): Observable<any> {
    return this.http.get<any>( this.link + 'ies/summMaterList' );
  }

  public getWorkSecure(): Observable<any> {
    return this.http.get<any>( this.link + 'ies/workSecure' );
  }

  public getTotal(): Observable<any> {
    return this.http.get<any>( this.link + 'ies/total' );
  }

  public createGrade(data): Observable<any> {
    return this.http.post<any>(this.link + 'y', data);
  }

  public editGrade(data): Observable<any> {
    return this.http.put<any>(this.link + 'y/' + data._id, data);
  }

  public deleteGrade(data): Observable<any> {
    return this.http.delete<any>(this.link + 'y/' + data._id, data); // .map(res => null);
  }
}
