import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronConfirmComponent } from './patron-confirm.component';

describe('EnforcerComponent', () => {
  let component: PatronConfirmComponent;
  let fixture: ComponentFixture<PatronConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});