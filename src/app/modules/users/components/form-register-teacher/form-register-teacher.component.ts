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

  constructor(private cc: ControlContainer) {}

  get formGroup() {
    return this.cc.control?.get(this.groupName);
  }

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    let form = this.formGroup;
    if (form) {
      return (
        form.get(formcontrolName)?.hasError(valiador) &&
        form.get(formcontrolName)?.touched
      );
    }
    return false;
  }
}

export function generateTeacherFormGroup(): FormGroup {
  return new FormGroup(
    {
      class_mode_online: new FormControl(false),
      class_mode_in_person: new FormControl(false),
      experience: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      price_hour: new FormControl('', [Validators.required]),
      about_me: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    },
    []
  );
}
