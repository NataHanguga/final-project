import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private table: TableService) { }

  ngOnInit() {
    this.getTeachers();
  }

  public getTeachers() {
    console.log('here');
    this.table.getTeachers().subscribe(
      res => console.log(res)
    );
  }

}
