import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private auth: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  });
  }

  get name() {return this.registerForm.get('name'); }
  get surname() {return this.registerForm.get('surname'); }
  get phoneNumber() {return this.registerForm.get('phoneNumber'); }
  get email() {return this.registerForm.get('email'); }
  get password() {return this.registerForm.get('password'); }
  get confirmPassword() {return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      window.alert('Registration data is invalid');
      return;
  } else {
    this.submitted = true;
    console.log(this.registerForm.value);
    if (this.auth
          .checkPassword(this.registerForm.value.password, this.registerForm.value.confirmPassword)) {
            this.auth.postRegistration(this.registerForm.value)
              .subscribe(res => {
                console.log(res);
                this.router.navigate(['login']);
              });
              }
    }
}

}
