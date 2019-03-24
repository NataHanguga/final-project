import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/services/grade.service';
import { SaveDocumentsService } from 'src/app/services/save-documents.service';

@Component({
  selector: 'app-summary-data-list',
  templateUrl: './summary-data-list.component.html',
  styleUrls: ['./summary-data-list.component.scss']
})
export class SummaryDataListComponent implements OnInit {

  headerList = ['#', 'Посада', 'Кількість штатних одиниць', 'Розряд',
          'Посадовий оклад', 'Вислуга', 'Надбавка та доплата',
          '20%', 'Фонд зарплати за місяць', 'Фонд зарплати на рік',
          'Оздоровчі', 'Щорічна винагорода', 'Разом'];

  propList = [];
  summPropList: any;
  summMaterPrice = [];
  workSecure = [];
  total: any;
  constructor(private prop: GradeService, private saveDocs: SaveDocumentsService) { }

  ngOnInit() {
    this.getProperties();
    this.getSumm();
    this.getMaterList();
    this.getWorkSecure();
    this.getTotal();
   }

  public getProperties() {
    this.prop.getDataForTable().subscribe(
      res => this.propList = res);
    }

    public getSumm() {
      this.prop.getSummProp().subscribe(res => this.summPropList = res);
    }

    public getMaterList() {
      this.prop.getSummMaterList().subscribe(res => this.summMaterPrice = res);
    }

    public getWorkSecure() {
      this.prop.getWorkSecure().subscribe(res => this.workSecure = res);
    }

    public getTotal() {
      this.prop.getTotal().subscribe(res => this.total = res.total);
    }

    public getFileName() {
      const input = document.getElementById('fileName') as HTMLInputElement;
      console.log(input.value);
      this.saveDocs.saveSummaryDataListDoc( {fileName : input.value}).subscribe(
        res => {
          console.log(res);
          window.alert('File saved to Downloads');
        }
      );
      input.value = '';
    }

}
