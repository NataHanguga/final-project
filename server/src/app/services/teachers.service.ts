import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient) { }

  public getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>( environment.link + 'teachers' );
  }

  public getTeacherById( id ): Observable<any> {
    return this.http.get<any>( environment.link + 'teacher/' + id );
  }

  public createTeacher(data): Observable<any> {
    return this.http.post<any>(environment.link + 'teacher', data);
  }

  public deleteTeacher(data): Observable<any> {
    return this.http.delete<any>(environment.link + 'teacher/' + data._id, data);
  }

  public editTeacher(data): Observable<any> {
    return this.http.put<any>(environment.link + 'teacher/' + data._id, data);
  }

  public getTeachersSumm(): Observable<any> {
    return this.http.get<any>( environment.link + 'teacherSumm' );

  }
}
