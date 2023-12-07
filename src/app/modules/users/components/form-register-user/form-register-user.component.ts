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
  selector: 'app-form-register-user',
  templateUrl: './form-register-user.component.html',
  styleUrls: ['./form-register-user.component.css'],
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
export class FormRegisterUserComponent {
  @Input() groupName = '';

  constructor(private cc: ControlContainer) {}

  get userFormGroup() {
    return this.cc.control?.get(this.groupName);
  }

  get nameControl() {
    return this.userFormGroup?.get('name');

    // o directamente el FormControl del padre usando
    // return this.cc.control?.get(`${this.groupName}.line1`);
  }
}

export function generateUserFormGroup(): FormGroup {
  return new FormGroup({
    id: new FormControl(0, []),
    _id: new FormControl(0, []),
    name: new FormControl('marilia tikk', [
      Validators.required,
      Validators.minLength(3),
    ]),

    nickname: new FormControl('marilia', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('1234', [Validators.required]),
    phone: new FormControl('765432', []),
    email: new FormControl('ytr@jasf.com', [
      Validators.required,
      Validators.email,
    ]),
    photo: new FormControl('url', [Validators.required]),
    role_id: new FormControl(1),
    date_of_birth: new FormControl(Date),
  });
}