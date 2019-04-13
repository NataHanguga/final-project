import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private auth: LoginService,
              private route: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]]
  });
  }

  // get f() { return this.loginForm.controls; }
  get name() {return this.loginForm.get('name'); }
  get password() {return this.loginForm.get('password'); }

    onSubmit() {
        this.submitted = true;
        console.log(this.loginForm.value);
        const message = document.getElementById('error');
        message.style.display = 'none';
        if (this.loginForm.value.name !== 'q' && this.loginForm.value.password !== 11111) {
          this.route.navigate(['/error']);
        } else {
        this.auth.postLogin(this.loginForm.value)
            .subscribe(res => {
                message.style.display = 'none';
                console.log(res);
                localStorage.setItem('key', res.token);
                localStorage.setItem('logIn', 'true');
                this.route.navigate(['/adminPage']);
              },
                err => {
                  if (err.status === 403) {
                    message.innerText = 'Incorrect username or password';
                    message.style.display = 'block';
                    message.style.color = 'red';
                    console.log(err.status, 'Incorrect username or password');
                  } else if (err.status === 400) {
                    message.innerText = 'Autification failed. Check the request';
                    message.style.display = 'block';
                    message.style.color = 'red';
                    console.log(err.status, 'Autification failed. Check the request');
                  }
                });
              }
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        } else {

        }
    }
}
