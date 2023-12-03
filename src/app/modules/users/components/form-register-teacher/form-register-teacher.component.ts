import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-register-teacher',
  templateUrl: './form-register-teacher.component.html',
  styleUrls: ['./form-register-teacher.component.css'],
})
export class FormRegisterTeacherComponent {
  // variable para manejar el formulario del teacher
  @Input() teacherForm!: FormGroup;
}
