import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  formLogin: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  errorMessage: string = '';

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  };

async onSubmit() {
  try {
    const response = await this.usersService.login(this.formLogin.value);

    if (response.fatal) {
      this.errorMessage = response.fatal;
    } else {
      // Almacenamiento del token en el localStorage
      localStorage.setItem('auth_token', response.token);

      // this.router.navigate(['/']);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

// TODO?
// checkUserRole() {}


}
