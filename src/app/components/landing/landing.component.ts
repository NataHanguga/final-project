import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})


export class LandingComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

}


