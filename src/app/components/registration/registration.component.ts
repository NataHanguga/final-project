import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private auth: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    if (this.auth.checkPassword(this.registerForm.value.password,
                                this.registerForm.value.confirmPassword)) {
      this.auth.postRegistration(this.registerForm.value)
          .subscribe(res =>
            console.log(res));
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } else {

    }
}

}
