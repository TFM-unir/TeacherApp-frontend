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

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  role_id: number = 1;

  // variable para manejar los formularios
  mainForm: FormGroup;

  // variable para manejar el formulario del teacher
  teacherForm!: FormGroup;

  // variable para manejar el formulario del subject
  subjectForm!: FormGroup;

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
      teacherForm: this.formBuilder.group({
        class_mode: ['', [Validators.required, Validators.minLength(4)]],
        experience: ['', [Validators.required, Validators.minLength(4)]],
        price_hour: ['', [Validators.required, Validators.minLength(1)]],

        about_me: ['', [Validators.required, Validators.maxLength(1000)]],
      }),
    });

    // this.userForm = this.mainForm.value.userForm;
    // this.teacherForm = this.mainForm.value.teacherForm;

    /*//inicializar el subject form
    this.subjectForm = new FormGroup(
      {
        subject: new FormControl('tkkkgg', [
          [Validators.required,
          Validators.minLength(3),
        ]),
        teacher_id: new FormControl(2, [
          [Validators.required,
          Validators.maxLength(1),
        ]),
        department_id: new FormControl(0, [
          [Validators.required,
          Validators.minLength(1),
        ]),
      },
      []
    );*/

    console.log(this.mainForm.value);
  }

  // insertamos los datos del formulario
  async onSubmit(): Promise<void> {
    try {
      let userForm = this.mainForm.value.userForm;
      let teacherForm = this.mainForm.value.teacherForm;

      userForm.date_of_birth = '1990-04-17';
      userForm.status = 2;

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
        // subjectsForm: this.subjectForm.value,
      };

      console.log(userForm);
      const response = await this.usersService.register(user);
      console.log(response);
      // si el id existe, se inserto correctamente
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
