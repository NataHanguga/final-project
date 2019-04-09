import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { GradeService } from 'src/app/services/grade.service';
import { PersentsService } from 'src/app/services/persents.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})

export class TeachersComponent implements OnInit {

  constructor(private teachers: TeachersService,
              private route: Router,
              private formBuilder: FormBuilder,
              private percentService: PersentsService,
              private gradeService: GradeService) { }

  teachersList: {};
  teacherItem: FormGroup;
  total: number;
  gradeList: [];
  percentList: [];
  gradeItem: any;
  percentItem: any;

  ngOnInit() {
    this.getTeachers();
    this.teacherItem = this.formBuilder.group({
      fullName: ['vuumk', Validators.required],
      education: ['high', Validators.required],
      category: ['', Validators.required],
      year: ['2018', Validators.compose([Validators.required, Validators.min(2000), Validators.max(2019)])],
      grade: ['',  Validators.required],
      pedagogicalTitle: ['', Validators.required],
      experience: ['12',
                    Validators.compose([Validators.required,
                                        Validators.min(0),
                                        Validators.max(50)])],
      teachHours: ['20', Validators.compose([Validators.required, Validators.min(0), Validators.max(36)])],
      concertmasterHours: ['14', Validators.compose([Validators.required, Validators.min(0), Validators.max(36)])],
      department: ['art', Validators.required],
    });
    this.getPosition();
    this.getPedTitle();
  }

  get fullName() {return this.teacherItem.get('fullName'); }
  get education() {return this.teacherItem.get('education'); }
  get category() {return this.teacherItem.get('category'); }
  get year() {return this.teacherItem.get('year'); }
  get grade() {return this.teacherItem.get('grade'); }
  get pedagogicalTitle() {return this.teacherItem.get('pedagogicalTitle'); }
  get experience() {return this.teacherItem.get('experience'); }
  get teachHours() {return this.teacherItem.get('teachHours'); }
  get concertmasterHours() {return this.teacherItem.get('concertmasterHours'); }
  get department() {return this.teacherItem.get('department'); }


  public getTeachers() {
    this.teachers.getTeachers().subscribe(
      res => {
        this.teachersList = res;
        this.total = Object.keys(res).length;
        console.log(this.teachersList, this.total);
        }
      );
  }

  public selectItem(event: any) {
    console.log(event.target.value);
    return event.target.value;
  }

  public getPosition() {
    this.gradeService.getGrades().subscribe(
      res => {
        this.gradeList = res;
        console.log(this.gradeList);
      });
  }

  public getPedTitle() {
    this.percentService.getPercent().subscribe(
      res => {
        this.percentList = res;
        console.log(res);
      }
    );
  }

  get f() {
    return this.teacherItem.controls;
  }

  public createTeacherData() {
    console.log(this.teacherItem.value);
    this.teachers.createTeacher(this.teacherItem.value)
      .subscribe(res => {
        this.getTeachers();
        console.log(res);
      });
  }

  public deleteTeacherData() {
    const but = document.querySelector('.click1');
    const id = but.id;
    for (let i = 0; i < this.total; i++) {
      if (this.teachersList[i]._id === id) {
        this.teachers.deleteTeacher(this.teachersList[i]).subscribe(
          res => {
            this.getTeachers();
          });
      }

    }
  }

  public editTeacherData(id) {
    const inputName = document.getElementById('fullNameInput') as HTMLInputElement;
    const inputEducation = document.getElementById('educationInput') as HTMLInputElement;
    const inputCategory = document.getElementById('categoryInput') as HTMLSelectElement;
    const inputYear = document.getElementById('yearInput') as HTMLInputElement;
    const inputGrade = document.getElementById('levelInput') as HTMLInputElement;
    const inputPedagogicalTitle = document.getElementById('pedagogicalTitleInput') as HTMLInputElement;
    const inputExperience = document.getElementById('experienceInput') as HTMLInputElement;
    const inputTeachHours = document.getElementById('teachHoursInput') as HTMLInputElement;
    const inputConcertmasterHours = document.getElementById('concertmasterHoursInput') as HTMLInputElement;
    const inputDepartment = document.getElementById('departmentInput') as HTMLInputElement;
    const but = document.querySelector('.click');


    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.total; i++) {
      if (this.teachersList[i]._id === id) {
        // console.log(this.teachersList[i]);
        inputName.value = this.teachersList[i].fullName;
        inputEducation.value = this.teachersList[i].education;
        inputCategory.value = this.teachersList[i].category;
        inputYear.value = this.teachersList[i].year;
        inputGrade.value = this.teachersList[i].grade;
        inputPedagogicalTitle.value = this.teachersList[i].pedagogicalTitle;
        inputExperience.value = this.teachersList[i].experience;
        inputTeachHours.value = this.teachersList[i].teachHours;
        inputConcertmasterHours.value = this.teachersList[i].concertmasterHours;
        inputDepartment.value = this.teachersList[i].department;
        but.id = i.toString();
        console.log(this.teachersList[i].category, 1, inputCategory.value, 1);
      }
    }



  }

  getId(id) {
    const but = document.querySelector('.click3');
    but.id = id;
    console.log(id, but);
  }

  check(val) {
    return ((val !== '') && (val !== null) && (val.length !== 0));
  }

  saveEditTeacherData() {
    const i = document.querySelector('.click').id;
    const inputName = (document.getElementById('fullNameInput') as HTMLInputElement).value;
    const inputEducation = (document.getElementById('educationInput') as HTMLInputElement).value;
    const inputCategory = (document.getElementById('categoryInput') as HTMLInputElement).value;
    const inputYear = (document.getElementById('yearInput') as HTMLInputElement).value;
    const inputGrade = (document.getElementById('levelInput') as HTMLInputElement).value;
    const inputPedagogicalTitle = (document.getElementById('pedagogicalTitleInput') as HTMLSelectElement).value;
    const inputExperience = (document.getElementById('experienceInput') as HTMLInputElement).value;
    const inputTeachHours = (document.getElementById('teachHoursInput') as HTMLInputElement).value;
    const inputConcertmasterHours = (document.getElementById('concertmasterHoursInput') as HTMLInputElement).value;
    const inputDepartment = (document.getElementById('departmentInput') as HTMLInputElement).value;

    if (this.check(inputName) && this.check(inputEducation) &&
        this.check(inputCategory) && this.check(inputYear) &&
        this.check(inputGrade) && this.check(inputPedagogicalTitle) &&
        this.check(inputExperience) && this.check(inputTeachHours) &&
        this.check(inputConcertmasterHours) && this.check(inputDepartment)) {
          this.teachersList[i].fullName = inputName;
          this.teachersList[i].education = inputEducation;
          this.teachersList[i].category = inputCategory;
          this.teachersList[i].year = inputYear;
          this.teachersList[i].grade = inputGrade;
          this.teachersList[i].pedagogicalTitle = inputPedagogicalTitle;
          this.teachersList[i].experience = inputExperience;
          this.teachersList[i].teachHours = inputTeachHours;
          this.teachersList[i].concertmasterHours = inputConcertmasterHours;
          this.teachersList[i].department = inputDepartment;

          this.teachers.editTeacher(this.teachersList[i]).subscribe(
            res => {
              this.getTeachers();
              console.log(res);
            }
          );
    } else {
      window.alert('some field is empty or not required');
      return;
    }

  }

  public findDataByIndex(i, id, atr) {
    return document.getElementById(id).innerHTML = this.teachersList[i][atr];
  }
  public showData(i) {
    this.findDataByIndex(i, 'fullNameShow', 'fullName');
    this.findDataByIndex(i, 'educationShow', 'education');
    this.findDataByIndex(i, 'categoryShow', 'category');
    this.findDataByIndex(i, 'yearShow', 'year');
    this.findDataByIndex(i, 'gradeShow', 'grade');
    this.findDataByIndex(i, 'pedagogicalTitleShow', 'pedagogicalTitle');
    this.findDataByIndex(i, 'experienceShow', 'experience');
    this.findDataByIndex(i, 'teachHoursShow', 'teachHours');
    this.findDataByIndex(i, 'concertmasterHoursShow', 'concertmasterHours');
    this.findDataByIndex(i, 'departmentShow', 'department');
  }
}
