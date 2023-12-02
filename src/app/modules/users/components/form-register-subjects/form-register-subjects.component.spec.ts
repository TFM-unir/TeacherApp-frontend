import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterSubjectsComponent } from './form-register-subjects.component';

describe('FormRegisterSubjectsComponent', () => {
  let component: FormRegisterSubjectsComponent;
  let fixture: ComponentFixture<FormRegisterSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterSubjectsComponent]
    });
    fixture = TestBed.createComponent(FormRegisterSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
