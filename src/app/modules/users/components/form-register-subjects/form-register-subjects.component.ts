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
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register-subjects',
  templateUrl: './form-register-subjects.component.html',
  styleUrls: ['./form-register-subjects.component.css'],
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
export class FormRegisterSubjectsComponent {
  @Input() groupName = '';

  constructor() {}
}
export function generateSubjectFormGroup(): FormGroup {
  return new FormGroup(
    {
      subject: new FormControl('tkkkgg', [
        Validators.required,
        Validators.minLength(3),
      ]),
      department_id: new FormControl(0, [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    []
  );
}
