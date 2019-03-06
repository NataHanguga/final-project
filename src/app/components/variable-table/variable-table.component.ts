import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StartPropertyService } from 'src/app/services/start-property.service';
// import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-variable-table',
  templateUrl: './variable-table.component.html',
  styleUrls: ['./variable-table.component.css']
})
export class VariableTableComponent implements OnInit {

  addPropForm: FormGroup;
  constructor(private fb: FormBuilder,
              private startService: StartPropertyService) {
    this.createForm();
   }

   createForm() {
     this.addPropForm = this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required]
     });
   }
   addProp(title, value) {
    this.startService.addProperty(title, value);
   }

  ngOnInit() {
  }



}
