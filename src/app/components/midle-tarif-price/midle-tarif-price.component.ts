import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import { SaveDocumentsService } from 'src/app/services/save-documents.service';

@Component({
  selector: 'app-midle-tarif-price',
  templateUrl: './midle-tarif-price.component.html',
  styleUrls: ['./midle-tarif-price.component.scss']
})
export class MidleTarifPriceComponent implements OnInit {

  headerNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  teachersList = [];
  summList = [];
  total: number;
  keysArray = ['teachHours', 'concertmasterHours', 'loadTotal', 'loadVolume', 'salary', 'total', 'twentyPersent2', 'inAll'];
  constructor(private teachers: TeachersService,
              private saveDocs: SaveDocumentsService) {}

  ngOnInit() {
    this.getTeachers();
    this.getTeacherSumm();
  }

  public getTeachers() {
    this.teachers.getTeachers().subscribe(
      res => {
        this.teachersList = res;
        this.total = Object.keys(res).length;
        console.log(this.teachersList, this.total, this.summList);
      }
    );
  }

  public getTeacherSumm() {
    this.teachers.getTeachersSumm().subscribe(
      res => this.summList = res
    );
  }

  public getFileName() {
    const input = document.getElementById('fileName') as HTMLInputElement;
    console.log(input.value);
    this.saveDocs.saveMidleTarifPrice( {fileName : input.value}).subscribe(
      res => {
        console.log(res);
        window.alert('File saved to Downloads');
      }
    );
    input.value = '';
  }

}
