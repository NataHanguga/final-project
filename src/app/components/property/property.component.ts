import { Component, OnInit } from '@angular/core';
import { GradeService } from 'src/app/services/grade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  propItem: FormGroup;
  propList = [];
  constructor(private prop: GradeService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProp();
    this.propItem = this.formBuilder.group({
      level: ['', Validators.compose([Validators.required,
                                      Validators.min(0),
                                      Validators.max(15)])],
      position: ['', Validators.required],
      staffUnitsAmounts: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get level() {return this.propItem.get('level'); }
  get position() {return this.propItem.get('position'); }
  get staffUnitsAmounts() {return this.propItem.get('staffUnitsAmounts'); }
  get price() {return this.propItem.get('price'); }


  getProp = () => {
    this.prop.getGrades().subscribe(
      res => {
        this.propList = res;
        console.log(this.propList);
      }
    );
  }

  getId(id) {
    const but = document.querySelector('.click2');
    but.id = id;
    console.log(id, but);
  }

  addPropData = () => {
    // const inputPer = document.getElementById('percent') as HTMLInputElement;
    console.log(this.propItem);
    this.prop.createGrade(this.propItem.value)
        .subscribe(res => {
            this.getProp();
            console.log(res);
        });
  }

  deletePropData = () => {
    const but = document.querySelector('.click2');
    const id = but.id;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.propList.length; i++) {
      if (this.propList[i]._id === id) {
        console.log(this.propList[i]._id, this.propList[i]._id === id, id);
        this.prop.deleteGrade(this.propList[i]).subscribe(
          res => {
            this.getProp();
          }
        );
      }
    }
    this.getProp();
  }
  editPropData = (id) => {
    console.log(id);
    const inputPos = document.getElementById('position') as HTMLInputElement;
    const inputLev = document.getElementById('level') as HTMLInputElement;
    const inputPrice = document.getElementById('price') as HTMLInputElement;
    const inputStaff = document.getElementById('staffUnitsAmounts') as HTMLInputElement;
    const but = document.querySelector('.click');
    for (let i = 0; i < this.propList.length; i++) {
      if (this.propList[i]._id === id) {
        inputPos.value = this.propList[i].position;
        inputLev.value = this.propList[i].level;
        inputPrice.value = this.propList[i].price;
        inputStaff.value = this.propList[i].staffUnitsAmounts;
        but.id = i.toString();

      }
    }
  }


  changePropData = () => {
    let i = document.querySelector('.click').id;
    const inputPos = document.getElementById('position') as HTMLInputElement;
    const inputLev = document.getElementById('level') as HTMLInputElement;
    const inputPrice = document.getElementById('price') as HTMLInputElement;
    const inputStaff = document.getElementById('staffUnitsAmounts') as HTMLInputElement;
    if ((inputPos.value !== null && inputPos.value !== '') ||
        (inputLev.value !== null && inputLev.value !== '') ||
        (inputPrice.value !== null && inputPrice.value !== '') ||
        (inputStaff.value !== null && inputStaff.value !== '')) {
          this.propList[i].position = inputPos.value;
          this.propList[i].level = inputLev.value;
          this.propList[i].price = inputPrice.value;
          this.propList[i].staffUnitsAmounts = inputStaff.value;
    }

    this.prop.editGrade(this.propList[i]).subscribe(
      res => {
        this.getProp();
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('edit prop');
      }
    );
    inputPos.value = '';
    inputLev.value = '';
    inputPrice.value = '';
    inputStaff.value = '';
    i = '';
  }

}
