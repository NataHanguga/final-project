import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaireListComponent } from './repaire-list.component';

describe('RepaireListComponent', () => {
  let component: RepaireListComponent;
  let fixture: ComponentFixture<RepaireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
