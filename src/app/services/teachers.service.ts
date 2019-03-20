import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  link = 'http://localhost:3000/api/teacher';

  constructor(private http: HttpClient) { }

  public getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>( this.link + 's' ); // .map((res) => res.json());
  }

  public getTeacherById( id ): Observable<any> {
    return this.http.get<any>( this.link + '/' + id );
  }

  public deleteTeacher(data): Observable<any> {
    return this.http.delete<any>(this.link + '/' + data._id, data); // .map(res => null);
  }

  public createTeacher(data): Observable<any> {
    return this.http.post<any>(this.link, data);
  }

  public getTeachersSumm(): Observable<any> {
    return this.http.get<any>( this.link + 'Summ' ); // .map((res) => res.json());

  }
}
