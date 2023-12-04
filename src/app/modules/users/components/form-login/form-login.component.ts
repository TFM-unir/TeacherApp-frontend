import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  errorAlert = false;
  errorMessage: string = '';
  mailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.mailRegEx)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  };

  async onSubmit() {
    try {
      const response = await this.usersService.login(this.formLogin.value);
      
      if (response.fatal) {
        this.errorAlert = true;
        this.errorMessage = response.fatal;
      } else {
        // Almacenamiento del token en el localStorage
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['']);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return (
      this.formLogin.get(formControlName)?.hasError(validator) &&
      this.formLogin.get(formControlName)?.touched
    );
  }

  returnToLogIn(): void {
    this.errorAlert = false;
    this.formLogin.reset();
  }
}
