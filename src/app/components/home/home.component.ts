import { Component, OnInit } from '@angular/core';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public chartType = 'doughnut';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'Data' }
  ];

  public chartLabels: Array<any> = ['Websites', 'Logo', 'Social Media', 'Adwords', 'E-Comerce'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#3755a4', '#4164c2', '#4b74e0', '#5584ff', '#25396e'],
      hoverBackgroundColor: ['#4164c2', '#4b74e0', '#5584ff', '#25396e', '#3755a4'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: false
  };
  public chartType1 = 'line';

  public chartDatasets1: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My Second dataset' }
  ];

  // public chartLabels1: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors1: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions1: any = {
    responsive: true
  };
  constructor() { }

  ngOnInit() {
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
