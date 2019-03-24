import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersentsService {

  link = 'http://localhost:3000/api/percent';
  refresh = new BehaviorSubject(undefined);
  autoRefresh = interval(500);

  constructor( private http: HttpClient) { }

  public getPercent = combineLatest(this.autoRefresh, this.refresh)
        .pipe(switchMap(
          () => this.http.get<any>( this.link + 's' )));

  public createPersent(data) {
    console.log(data);
    return this.http.post(this.link, data);
  }

  public editPersent(data): Observable<any> {
    return this.http.put<any>(this.link + '/' + data._id, data);
  }

  public deletePersent(data): Observable<any> {
    return this.http.delete<any>(this.link + '/' + data._id, data); // .map(res => null);
  }
}
