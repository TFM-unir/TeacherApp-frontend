import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentControlPanelComponent } from './student-control-panel.component';

describe('StudentControlPanelComponent', () => {
  let component: StudentControlPanelComponent;
  let fixture: ComponentFixture<StudentControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentControlPanelComponent]
    });
    fixture = TestBed.createComponent(StudentControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
