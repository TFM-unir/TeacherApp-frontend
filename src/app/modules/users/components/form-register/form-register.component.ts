import { Component, inject } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegister } from 'src/app/core/models/user-register.interface';
import { UsersService } from '../../../../core/services/users.service';
import { generateUserFormGroup } from '../form-register-user/form-register-user.component';
import { generateTeacherFormGroup } from '../form-register-teacher/form-register-teacher.component';
import { generateSubjectFormGroup } from '../form-register-subjects/form-register-subjects.component';
import { generateLocationFormGroup } from '../form-register-location/form-register-location.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  authService = inject(AuthService);
  role_id: number = 1;

  // variable para manejar los formularios
  mainForm: FormGroup;

  usersService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  // Titulo de la pagina
  titulo = 'New User';

  constructor(private formBuilder: FormBuilder) {
    // inicializamos el user form
    this.mainForm = this.formBuilder.group({
      role_id: this.role_id,
      //inicializar el user form
      userForm: generateUserFormGroup(),
      //inicializar el teacher form
      teacherForm: generateTeacherFormGroup(),
      //inicializar materias
      subjectForm: generateSubjectFormGroup(),
      /*subjectForm: this.formBuilder.group({
        subject: ['', [Validators.required, Validators.minLength(3)]],
        department_id: [0, [Validators.required, Validators.minLength(1)]],
      }),*/
      //inicializar location
      locationForm: generateLocationFormGroup(),
    });

    // this.userForm = this.mainForm.value.userForm;
    // this.teacherForm = this.mainForm.value.teacherForm;

    console.log(this.mainForm.controls['userForm']);
  }

  // insertamos los datos del formulario
  async onSubmit(): Promise<void> {
    try {
      let userForm = this.mainForm.value.userForm;
      let teacherForm = this.mainForm.value.teacherForm;
      let subjectForm = this.mainForm.value.subjectForm;
      let locationForm = this.mainForm.value.locationForm;

      userForm.role_id = this.mainForm.value.role_id;

      userForm.status = 2;
      if (userForm.role_id == 2) userForm.status = 1;

      console.log(this.mainForm);
      let user: UserRegister = {
        userForm: userForm,
        locationForm: locationForm,
        teacherForm: teacherForm,
        subjectForm: subjectForm,
      };
      const response = await this.usersService.register(user);
      console.log(response);
      // si el id existe, se inserto correctamente
      if (response.userForm.id) {
        alert('Usario registrado correctamente');
        this.router.navigate(['']);
      } else {
        alert('El usario no se ha podido registrar');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    return (
      this.mainForm.value.userForm.get(formcontrolName)?.hasError(valiador) &&
      this.mainForm.value.userForm.get(formcontrolName)?.touched
    );
  }

  checkDisable() {
    if (this.mainForm.value.role_id === '2') {
      return !this.mainForm.valid;
    } else {
      return !this.mainForm.controls['userForm'].valid;
    }
  }
}
