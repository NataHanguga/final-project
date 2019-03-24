import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTarifComponent } from './manager-tarif.component';

describe('ManagerTarifComponent', () => {
  let component: ManagerTarifComponent;
  let fixture: ComponentFixture<ManagerTarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTarifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
