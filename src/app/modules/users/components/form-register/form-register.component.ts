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
import { UsersService } from '../../services/users.service';
import { generateUserFormGroup } from '../form-register-user/form-register-user.component';
import { generateTeacherFormGroup } from '../form-register-teacher/form-register-teacher.component';
import { generateSubjectFormGroup } from '../form-register-subjects/form-register-subjects.component';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
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

      subjectForm: generateSubjectFormGroup(),
    });

    // this.userForm = this.mainForm.value.userForm;
    // this.teacherForm = this.mainForm.value.teacherForm;

    console.log(this.mainForm.value);
  }

  // insertamos los datos del formulario
  async onSubmit(): Promise<void> {
    try {
      let userForm = this.mainForm.value.userForm;
      let teacherForm = this.mainForm.value.teacherForm;
      let subjectForm = this.mainForm.value.subjectForm;

      //userForm.date_of_birth = '1990-04-17';
      userForm.status = 2;
      userForm.role_id = this.mainForm.value.role_id;

      console.log(userForm);
      let user: UserRegister = {
        userForm: userForm,
        locationForm: {
          id: 0,
          latitude: 41.385063,
          longitude: 2.987456,
          address: 'calle de quintal 25',
          city: 'Santiago',
          province: 'A Coruña',
        },
        teacherForm: teacherForm,
        subjectForm: subjectForm,
      };
      const response = await this.usersService.register(user);
      // console.log(response);
      // si el id existe, se inserto correctamente
      console.log(response);
      if (response.userForm.id) {
        this.router.navigate(['']);
      } else {
        alert('Usario no se ha podido registrar');
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
}
