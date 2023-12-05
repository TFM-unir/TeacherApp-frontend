import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-register-teacher',
  templateUrl: './form-register-teacher.component.html',
  styleUrls: ['./form-register-teacher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // para poder comunicarse con el padre
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject(ControlContainer, { skipSelf: true, host: true }),
    },
  ],
})
export class FormRegisterTeacherComponent {
  // variable para manejar el formulario del teacher
  @Input() groupName = '';

  constructor() {}
}
export function generateTeacherFormGroup(): FormGroup {
  return new FormGroup(
    {
      class_mode_online: new FormControl(false),
      class_mode_in_person: new FormControl(false),
      experience: new FormControl(6, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      price_hour: new FormControl(15, [
        Validators.required,
        Validators.minLength(1),
      ]),
      about_me: new FormControl('soy profe', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    },
    []
  );
}
