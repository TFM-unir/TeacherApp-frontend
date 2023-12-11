import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterClassHoursComponent } from './form-register-class-hours.component';

describe('FormRegisterClassHoursComponent', () => {
  let component: FormRegisterClassHoursComponent;
  let fixture: ComponentFixture<FormRegisterClassHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterClassHoursComponent]
    });
    fixture = TestBed.createComponent(FormRegisterClassHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
