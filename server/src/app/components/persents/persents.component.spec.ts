import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersentsComponent } from './persents.component';

describe('PersentsComponent', () => {
  let component: PersentsComponent;
  let fixture: ComponentFixture<PersentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
