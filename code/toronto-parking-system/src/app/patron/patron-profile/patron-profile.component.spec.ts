import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronProfileComponent } from './patron-profile.component';

describe('PatronProfileComponent', () => {
  let component: PatronProfileComponent;
  let fixture: ComponentFixture<PatronProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
