import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import { PersentsService } from 'src/app/services/persents.service';

@Component({
  selector: 'app-manager-tarif',
  templateUrl: './manager-tarif.component.html',
  styleUrls: ['./manager-tarif.component.css']
})
export class ManagerTarifComponent implements OnInit {

  headerTitle = ['№', 'Прізвище, ім\'я та по батькові',
                'Відділ', 'Тарифна ставка з урахуванням підвищень',
                 'Розмір оплати, %', 'Розмір оплати, грн'];
  teachersList = [];
  teachersManager = [];
  total: number;
  summList = [];
  summ = 0;
  midlePrice = 0;
  priceFond = 0;
  constructor(private teachers: TeachersService,
              private percents: PersentsService) {}

  ngOnInit() {
    this.getTeachers();
    this.getTeacherSumm();
  }

  public getTeachers() {
    this.teachers.getTeachers().subscribe(
      res => {
        this.teachersList = res;
        this.total = Object.keys(res).length;
        console.log(this.teachersList, this.total);
        for (let i = 0; i < this.total; i++) {
          if (this.teachersList[i].pedagogicalTitle === 'coutch' || this.teachersList[i].pedagogicalTitle === 'manager') {
            this.teachersManager.push(this.teachersList[i]);
            this.summ += +(this.teachersList[i].tarifAndIncrease);
          }
        }
      });
  }

  public getTeacherSumm() {
    this.teachers.getTeachersSumm().subscribe(
      res => {
        this.summList = res;
        this.midlePrice = +(this.summList[7] / this.summList[3]).toFixed(2);
        this.priceFond = +(this.summ + this.summList[7]).toFixed(2);
        console.log(this.summList);
      });
  }
}
