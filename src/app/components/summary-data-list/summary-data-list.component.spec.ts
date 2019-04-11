import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDataListComponent } from './summary-data-list.component';

describe('SummaryDataListComponent', () => {
  let component: SummaryDataListComponent;
  let fixture: ComponentFixture<SummaryDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
