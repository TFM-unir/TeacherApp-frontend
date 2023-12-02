import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterLocationComponent } from './form-register-location.component';

describe('FormRegisterLocationComponent', () => {
  let component: FormRegisterLocationComponent;
  let fixture: ComponentFixture<FormRegisterLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterLocationComponent]
    });
    fixture = TestBed.createComponent(FormRegisterLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
