import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-midle-tarif-price',
  templateUrl: './midle-tarif-price.component.html',
  styleUrls: ['./midle-tarif-price.component.css']
})
export class MidleTarifPriceComponent implements OnInit {

  headerNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  teachersList = [];
  summList = [];
  total: number;
  keysArray = ['teachHours', 'concertmasterHours', 'loadTotal', 'loadVolume', 'salary', 'total', 'twentyPersent2', 'inAll'];
  constructor(private teachers: TeachersService) {}

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

}
