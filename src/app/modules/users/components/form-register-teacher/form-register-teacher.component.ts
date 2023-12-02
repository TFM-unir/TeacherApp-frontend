import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register-teacher',
  templateUrl: './form-register-teacher.component.html',
  styleUrls: ['./form-register-teacher.component.css'],
})
export class FormRegisterTeacherComponent {
  // variable para manejar el formulario del teacher
  teacherForm: FormGroup;
  usersService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  constructor() {
    //inicializar el teacher form
    this.teacherForm = new FormGroup(
      {
        class_mode: new FormControl('tkkkgg', [
          Validators.required,
          Validators.minLength(4),
        ]),
        experience: new FormControl(5, [
          Validators.required,
          Validators.maxLength(1),
        ]),
        price_hour: new FormControl(10.5, [
          Validators.required,
          Validators.minLength(1),
        ]),
        about_me: new FormControl('tkkkgg', [
          Validators.required,
          Validators.maxLength(1000),
        ]),
      },
      []
    );
  }

  // insertamos los datos del formulario
  async onSubmit(): Promise<void> {}

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    return (
      this.teacherForm.get(formcontrolName)?.hasError(valiador) &&
      this.teacherForm.get(formcontrolName)?.touched
    );
  }
}
