import {
  Component,
  OnInit
} from '@angular/core';
import {
  TeachersService
} from 'src/app/services/teachers.service';

@Component({
  selector: 'app-tarif-list',
  templateUrl: './tarif-list.component.html',
  styleUrls: ['./tarif-list.component.css']
})
export class TarifListComponent implements OnInit {

  headerNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  teachersList = [];
  total: number;
  headerElements = ['№', 'Прізвище, ім*я та по батькові',
    'Освіта', 'Посада, рік', 'Розряд', 'Тарифна ставка',
    'Педагогічне звання', 'Розмір підвищень',
    'Місячний тариф з урахуванням підвищень',
    'Стаж роботи', '%', 'Розмір Надбавки за вислугу років',
    '20%', 'Місячний тариф з урахуванням підвищень'
  ];

  constructor(private teachers: TeachersService) {}

  ngOnInit() {
    this.getTeachers();
  }

  public getTeachers() {
    this.teachers.getTeachers().subscribe(
      res => {
        this.teachersList = res;
        this.total = Object.keys(res).length;
        console.log(this.teachersList, this.total);
        for (let i = 0; i < this.total; i++) {
          if (this.teachersList[i].pedagogicalTitle === 'none') {
            this.teachersList[i].pedagogicalTitle = '';
            this.teachersList[i].increase = '';
          }
        }
      }
    );
  }

}
