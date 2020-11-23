import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcerComponent } from './enforcer.component';

describe('EnforcerComponent', () => {
  let component: EnforcerComponent;
  let fixture: ComponentFixture<EnforcerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnforcerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnforcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
