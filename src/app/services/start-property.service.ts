import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class StartPropertyService {

  url = 'http://localhost:4200/variable';
  constructor(private http: HttpClient) { }

  getPosition() {
    return this.http.get('/variable').map((res: Response) => res.json());
  }

  addProperty(title, value) {
    const obj = {
      title: title,
      value: value
    };

    console.log(obj);
    this.http
          .post(`${this.url}/add`, obj)
          .subscribe(res => console.log('Done'));
  }

}
