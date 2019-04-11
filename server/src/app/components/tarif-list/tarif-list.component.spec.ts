import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifListComponent } from './tarif-list.component';

describe('TarifListComponent', () => {
  let component: TarifListComponent;
  let fixture: ComponentFixture<TarifListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
