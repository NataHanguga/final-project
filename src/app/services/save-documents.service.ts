import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveDocumentsService {

  link = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  saveRepaireList(data) {
    return this.http.post(this.link + 'saveRepaireList', data);
  }

  saveSummaryDataListDoc(data) {
    return this.http.post(this.link + 'saveSummaryDataList', data);
  }

  saveMidleTarifPrice(data) {
    return this.http.post(this.link + 'createDocMidleTarifPrice', data);
  }

  saveManagerTarifList(data) {
    return this.http.post(this.link + 'createDocManagerTarifList', data);
  }

  saveDocTarifList(data) {
    return this.http.post(this.link + 'createDocTarifList', data);
  }
}
