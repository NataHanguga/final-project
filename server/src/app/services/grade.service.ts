import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  // link = 'http://localhost:3000/api/propert';

  constructor( private http: HttpClient) { }

  public getGrades(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties' );
  }

  public getDataForTable(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties/forTable' );
  }

  public getSummProp(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties/summPropList' );
  }

  public getSummMaterList(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties/summMaterList' );
  }

  public getWorkSecure(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties/workSecure' );
  }

  public getTotal(): Observable<any> {
    return this.http.get<any>( environment.link + 'properties/total' );
  }

  public createGrade(data): Observable<any> {
    return this.http.post<any>(environment.link + 'property', data);
  }

  public editGrade(data): Observable<any> {
    return this.http.put<any>(environment.link + 'property/' + data._id, data);
  }

  public deleteGrade(data): Observable<any> {
    return this.http.delete<any>(environment.link + 'property/' + data._id, data); // .map(res => null);
  }
}
