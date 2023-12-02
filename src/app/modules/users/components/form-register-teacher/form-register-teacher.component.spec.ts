import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterTeacherComponent } from './form-register-teacher.component';

describe('FormRegisterTeacherComponent', () => {
  let component: FormRegisterTeacherComponent;
  let fixture: ComponentFixture<FormRegisterTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterTeacherComponent]
    });
    fixture = TestBed.createComponent(FormRegisterTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
