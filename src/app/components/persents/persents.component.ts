import {
  Component,
  OnInit
} from '@angular/core';
import {
  PersentsService
} from 'src/app/services/persents.service';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-persents',
  templateUrl: './persents.component.html',
  styleUrls: ['./persents.component.scss']
})
export class PersentsComponent implements OnInit {

  percentList = [];
  percentItem: FormGroup;


  constructor(private p: PersentsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getPercents();
    this.percentItem = this.formBuilder.group({
      learningPosition: ['', Validators.compose([Validators.required])],
      percent: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.min(0),
        Validators.max(100)
      ])]
    });
  }

  // convenience getter for easy access to form fields
  get f() {return this.percentItem.controls; }
  get learningPosition() {return this.percentItem.get('learningPosition'); }
  get percent() {return this.percentItem.get('percent'); }


  getPercents = () => {
    this.p.getPercent().subscribe(res => this.percentList = res);
  }

  getId(id) {
    const but = document.querySelector('.click1');
    but.id = id;
    console.log(id, but);
  }

  deletePercents = () => {
    const but = document.querySelector('.click1');
    const id = but.id;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.percentList.length; i++) {
      if (this.percentList[i]._id === id) {
        this.p.deletePersent(this.percentList[i]).subscribe(
          res => {
            this.getPercents();
            console.log('percent Deleted');

          }
        );
      }
    }
  }

  editPercentData = (id) => {
    console.log(id);
    const inputVal = document.getElementById('learningPosition') as HTMLInputElement;
    const inputPer = document.getElementById('percent') as HTMLInputElement;
    const but = document.querySelector('.click');
    for (let i = 0; i < this.percentList.length; i++) {
      if (this.percentList[i]._id === id) {
        inputVal.value = this.percentList[i].learningPosition;
        inputPer.value = this.percentList[i].percent;
        but.id = i.toString();

      }
    }

  }


  changePercentData = () => {
    let i = document.querySelector('.click').id;
    const inputVal = document.getElementById('learningPosition') as HTMLInputElement;
    const inputPer = document.getElementById('percent') as HTMLInputElement;
    if ((inputVal.value !== null && inputVal.value !== '') ||
      (inputPer.value !== null && inputPer.value !== '')) {
      this.percentList[i].learningPosition = inputVal.value;
      this.percentList[i].percent = inputPer.value;
    }

    this.p.editPersent(this.percentList[i]).subscribe(
      res => {
        this.getPercents();
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('edit todo');
      }
    );
    inputVal.value = '';
    inputPer.value = '';
    i = '';
  }

  addPercentData = () => {
    const inputPer = document.getElementById('percent') as HTMLInputElement;
    const inputVal = document.getElementById('learningPosition') as HTMLInputElement;

    this.p.createPersent(this.percentItem.value).subscribe(
      res => {
        this.getPercents();
        console.log(res);
      });

    this.percentItem.value.percent = '';
    console.log(this.percentItem.value.percent);
  }

}
