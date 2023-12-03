import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-form-register-location',
  templateUrl: './form-register-location.component.html',
  styleUrls: ['./form-register-location.component.css'],
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
export class FormRegisterLocationComponent {
  // @Input() groupName = '';

  constructor() {}
}
