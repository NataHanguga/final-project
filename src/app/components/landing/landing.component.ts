import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $('.gallery').magnificPopup({
    //   delegate: 'a',
    //   type: 'image',
    //   gallery: {
    //     enabled: true
    //   }
    // });
  }

}
