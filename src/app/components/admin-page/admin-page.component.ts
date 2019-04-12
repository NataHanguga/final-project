import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    $(document).ready( () => {

      $('#sidebarCollapse').on('click', () => {
        $('#sidebar').toggleClass('active');
      });
    });
    $('#menu-toggle').click(function(){
  $(this).toggleClass('open');
})
  }

  logOut() {
    localStorage.setItem('logIn', 'false');
    this.route.navigate(['/']);
  }

  loadPage(name) {
    this.route.navigate([name]);
  }
}
