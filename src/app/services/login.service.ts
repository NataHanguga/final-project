import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  link = 'http://localhost:3000/api/';
  isLoggedIn = false;
  constructor(private http: HttpClient) { }

  public postLogin(data): Observable<any> {
    return this.http
               .post<any>(this.link + 'login', data)
               .pipe(map(res => {
                      this.isLoggedIn = true;
                      return res;
                      },
                      err => err));
  }

  public postRegistration(data): Observable<any> {
    return this.http.post<any>(this.link + 'registration', data).pipe(map(res => res));
  }

  public checkPassword(pas1, pas2) {
    if (pas1 === pas2) {
      return true;
    } else {
      return false;
    }
  }
}
