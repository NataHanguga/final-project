import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersentsService {

  constructor( private http: HttpClient) { }

  public getPercent() {
    return this.http.get<any>( environment.link + 'percents' );
  }

  public createPersent(data) {
    console.log(data);
    return this.http.post(environment.link + 'percent', data);
  }

  public editPersent(data): Observable<any> {
    return this.http.put<any>(environment.link + 'percent/' + data._id, data);
  }

  public deletePersent(data): Observable<any> {
    return this.http.delete<any>(environment.link + 'percent/' + data._id, data);
  }
}
