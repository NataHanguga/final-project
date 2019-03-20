import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { TeacherFunctionsService } from '../../services/teacherFunctions.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  constructor(private teachers: TeachersService,
              private route: Router,
              private formBuilder: FormBuilder,
              private teacherFunctions: TeacherFunctionsService) { }

  teachersList: {};
  teacherItem: FormGroup;
  total: number;

  ngOnInit() {
    this.getTeachers();
    this.teacherItem = this.formBuilder.group({
      fullName: ['Dude f.d.', Validators.required],
      education: ['high', Validators.required],
      category: ['3-4', Validators.required],
      department: ['art', Validators.required],
      year: ['2018', Validators.required],
      grade: ['13', Validators.required],
      pedagogicalTitle: ['none', Validators.required],
      experience: ['12', Validators.required],
      teachHours: ['20', Validators.required],
      concertmasterHours: ['14', Validators.required]
    });

  }

  public getTeachers() {
    this.teachers.getTeachers().subscribe(
      res => {
        this.teachersList = res;
        this.total = Object.keys(res).length;
        console.log(this.teachersList, this.total);
        }
     );
  }

  public getTeacherById( id ) {
    console.log(id);
    this.route.navigate(['teacher/' + id]);

  }

  get f() {
    return this.teacherItem.controls;
  }

  public createTeacherData() {
    console.log(this.teacherItem.value);
    this.teachers.createTeacher(this.teacherItem.value)
      .subscribe(res => console.log(res));
    this.getTeachers();
  }

  public deleteTeacherData(id) {
    for (let i = 0; i < this.total; i++) {
      if (this.teachersList[i]._id === id) {
        this.teachers.deleteTeacher(this.teachersList[i]).subscribe();
      }

    }
    this.getTeachers();
  }

}
