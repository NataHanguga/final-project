import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  TeachersService
} from 'src/app/services/teachers.service';
import {
  Teacher
} from 'src/app/models/teacher.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.scss']
})
export class TeacherItemComponent implements OnInit {

  private id: number;
  idValue = 'id';
  size: number;
  index: number;
  public teacherList = [];
  public teacherItem = [];
  teacherItemData: FormGroup;
  constructor(private activateRoute: ActivatedRoute,
              private teacherService: TeachersService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.clear();
    this.activateRoute
      .params
      .subscribe(
        params => this.id = params[this.idValue]);
    // this.fuckinData();
    this.editTeacherData();
    this.teacherService.getTeacherById(this.id)
    .subscribe(
      res => {
        this.teacherList = res;
        this.size = Object.keys(res).length;
        for (let i = 0; i < this.size; i++) {
          if (this.teacherList[i]._id === this.id) {
            this.index = i;
            this.teacherItem = this.teacherList[i] as string[];
            console.log(this.index, this.teacherItem);
            return this.teacherItem;
          }
        }
      }
    );
    console.log(this.id);
  }

  public editTeacherData() {
    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    const data = this.teacherItem;
    // fullNameInput.value = data;
    console.log(data);
  }

  /*
<div class="modal fade"
id="editCardModal"
tabindex="-1"
role="dialog"
aria-labelledby="editCardModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<!-- Modal Header -->
<div class="modal-header">
  <button type="button" class="close" data-dismiss="modal">
               <span aria-hidden="true">&times;</span>
               <span class="sr-only">Close</span>
        </button>
  <h4 class="modal-title form-title" id="editCardModal">
    Add New Teacher
  </h4>
</div>

<!-- Modal Body -->
<div class="modal-body">

  <form class="form-horizontal" role="form" [formGroup]="teacherItemData" (ngSubmit)="createTeacherData()">
   <!-- fullName -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="fullName"
                        placeholder="FullName"
                        class="form-control input100"
                        [ngClass]="{ 'is-invalid': submitted && f.fullName.errors }" />
      <div *ngIf="submitted && f.fullName.errors" class="invalid-feedback">
        <div *ngIf="f.fullName.errors.required">FullName is required</div>
      </div>
    </div>
    <!-- education -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="education"
                        placeholder="Education"
                        class="form-control input100  education"
                        [ngClass]="{ 'is-invalid': submitted && f.education.errors }" />
      <div *ngIf="submitted && f.education.errors" class="invalid-feedback">
        <div *ngIf="f.education.errors.required"> education is required</div>
      </div>
    </div>
    <!-- category -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="category"
                        placeholder="Category"
                        class="form-control input100 category"
                        [ngClass]="{ 'is-invalid': submitted && f.category.errors }" />
      <div *ngIf="submitted && f.category.errors" class="invalid-feedback">
        <div *ngIf="f.category.errors.required"> category is required</div>
      </div>
    </div>
    <!-- year -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="year"
                        placeholder="Year"
                        class="form-control input100 year"
                        [ngClass]="{ 'is-invalid': submitted && f.year.errors }" />
      <div *ngIf="submitted && f.year.errors" class="invalid-feedback">
        <div *ngIf="f.year.errors.required"> Year is required</div>
      </div>
    </div>
    <!-- grade -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="grade"
                        placeholder="Grade"
                        class="form-control input100 grade"
                        [ngClass]="{ 'is-invalid': submitted && f.grade.errors }" />
      <div *ngIf="submitted && f.grade.errors" class="invalid-feedback">
        <div *ngIf="f.grade.errors.required"> Grade is required</div>
      </div>
    </div>
    <!-- pedagogicalTitle -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="pedagogicalTitle"
                        placeholder="Pedagogical Title"
                        class="form-control input100 pedagogicalTitle"
                        [ngClass]="{ 'is-invalid': submitted && f.pedagogicalTitle.errors }" />
      <div *ngIf="submitted && f.pedagogicalTitle.errors" class="invalid-feedback">
        <div *ngIf="f.pedagogicalTitle.errors.required"> Pedagogical Title is required</div>
      </div>
    </div>
    <!-- experience -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="experience"
                        placeholder="Experience"
                        class="form-control input100 experience"
                        [ngClass]="{ 'is-invalid': submitted && f.experience.errors }" />
      <div *ngIf="submitted && f.experience.errors" class="invalid-feedback">
        <div *ngIf="f.experience.errors.required"> Experience is required</div>
      </div>
    </div>
    <!-- teachHours -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="teachHours"
                        placeholder="Teach Hours"
                        class="form-control input100 teachHours"
                        [ngClass]="{ 'is-invalid': submitted && f.teachHours.errors }" />
      <div *ngIf="submitted && f.teachHours.errors" class="invalid-feedback">
        <div *ngIf="f.teachHours.errors.required"> Teach Hours is required</div>
      </div>
    </div>
    <!-- concertmasterHours -->
    <div class="form-group wrap-input100  rs1-wrap-input100 validate-input">
      <input type="text"
                        formControlName="concertmasterHours"
                        placeholder="Concertmaster Hours"
                        class="form-control input100 concertmasterHours"
                        [ngClass]="{ 'is-invalid': submitted && f.concertmasterHours.errors }" />
      <div *ngIf="submitted && f.concertmasterHours.errors" class="invalid-feedback">
        <div *ngIf="f.concertmasterHours.errors.required"> Concertmaster Hours is required</div>
      </div>
    </div>
  </form>
</div>
<!-- Modal Footer -->
<div class="modal-footer">
  <div class="form-group container-login-form">
    <button class="btn login-form add" data-dismiss="modal" (click)="editTeacherData()">Add</button>
  </div>
</div>
</div>
</div>
</div>

 */
}
