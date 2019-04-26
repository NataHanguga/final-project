import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/services/grade.service';
import { SaveDocumentsService } from 'src/app/services/save-documents.service';

@Component({
  selector: 'app-repaire-list',
  templateUrl: './repaire-list.component.html',
  styleUrls: ['./repaire-list.component.css']
})
export class RepaireListComponent implements OnInit {

  headerList = ['№', 'Посада', 'Кількість штатних одиниць', 'Розряд', 'Посадовий оклад', 'Фонд зарплати за місяць', 'Фонд зарплати на рік'];
  propList = [];

  constructor(private prop: GradeService, private saveDoc: SaveDocumentsService) { }

  ngOnInit() {
    this.getProperties();
   }

  public getProperties() {
    this.prop.getGrades().subscribe(
      res => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < res.length; i++) {
          if ( res[i].position === 'repairer-installer' ) {
              this.propList.push(res[i]);
          }
        }
        console.log(this.propList, res);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.propList.length; i++) {
          this.propList[i]
              .priceFondByMounth = +this.propList[i].price * +this.propList[i].staffUnitsAmounts;
          this.propList[i].priceFondByYear = this.propList[i].priceFondByMounth * 12;
          this.propList[i].summ = this.propList[i].priceFondByMounth * 12 +
                                  this.propList[i].price * 2;
          }
      }
    );
  }

  getFileName() {
    const input = document.getElementById('fileName') as HTMLInputElement;
    console.log(input.value);
    this.saveDoc.saveRepaireList( {fileName : input.value}).subscribe(
      res => {
        console.log(res);
        window.alert('File saved to Downloads');
      }
    );
    input.value = '';
  }

}
