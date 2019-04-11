import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public activePage = 'appTeacher';

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  showContent(value) {
    this.activePage = value;
  }

  logOut() {
    localStorage.setItem('logIn', 'true');
    this.route.navigate(['/']);
  }

}
