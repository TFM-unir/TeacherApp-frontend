import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherControlPanelComponent } from './teacher-control-panel.component';

describe('TeacherControlPanelComponent', () => {
  let component: TeacherControlPanelComponent;
  let fixture: ComponentFixture<TeacherControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherControlPanelComponent]
    });
    fixture = TestBed.createComponent(TeacherControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
