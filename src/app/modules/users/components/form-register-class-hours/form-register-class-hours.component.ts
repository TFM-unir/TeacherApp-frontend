import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-register-class-hours',
  templateUrl: './form-register-class-hours.component.html',
  styleUrls: ['./form-register-class-hours.component.css'],
})
export class FormRegisterClassHoursComponent {
  @Input() groupName = '';
}
