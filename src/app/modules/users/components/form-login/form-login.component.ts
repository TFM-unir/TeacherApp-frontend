import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  formLogin: FormGroup;
  usersService = inject(UsersService);

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  };

  async onSubmit() {
    const response = await this.usersService.login(this.formLogin.value);
    console.log(response);
}

}
