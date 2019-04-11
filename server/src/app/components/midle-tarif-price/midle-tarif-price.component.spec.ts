import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidleTarifPriceComponent } from './midle-tarif-price.component';

describe('MidleTarifPriceComponent', () => {
  let component: MidleTarifPriceComponent;
  let fixture: ComponentFixture<MidleTarifPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidleTarifPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidleTarifPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
