import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcerProfileComponent } from './enforcer-profile.component';

describe('EnforcerProfileComponent', () => {
  let component: EnforcerProfileComponent;
  let fixture: ComponentFixture<EnforcerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnforcerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnforcerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
