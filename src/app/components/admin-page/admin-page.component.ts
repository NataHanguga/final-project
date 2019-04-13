import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public activePage = 'home';

  constructor(private route: Router) {}

  ngOnInit() {
    $(document).ready(() => {

      $('#sidebarCollapse').on('click', () => {
        $('#sidebar').toggleClass('active');
      });
    });
    $('#menu-toggle').click(() => {
      $(this).toggleClass('open');
    });
  }

  logOut() {
    localStorage.setItem('logIn', 'false');
    this.route.navigate(['/']);
  }

  showContent(value) {
    this.activePage = value;
    console.log(this.activePage);
  }
}
