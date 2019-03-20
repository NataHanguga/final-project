import { Component, OnInit } from '@angular/core';
import { PersentsService } from 'src/app/services/persents.service';

@Component({
  selector: 'app-persents',
  templateUrl: './persents.component.html',
  styleUrls: ['./persents.component.scss']
})
export class PersentsComponent implements OnInit {

  constructor(private p: PersentsService) { }
// private p: PersentsService;


  ngOnInit() {
    this.getPersents();
   }

   getPersents = () => {
    this.p.getPersent().subscribe(
      res => console.log(res)
    );
  }
}
