import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegister } from 'src/app/core/models/user-register.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  // variable para manejar el formulario del usuario
  userForm: FormGroup;

  // variable para manejar el formulario del teacher
  teacherForm: FormGroup;

  // variable para manejar el formulario del subject
  subjectForm: FormGroup;

  usersService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  // Titulo de la pagina
  titulo = 'New User';

  constructor() {
    // inicializamos el user form
    this.userForm = new FormGroup(
      {
        id: new FormControl(0, []),
        _id: new FormControl(0, []),
        name: new FormControl('tgg', [
          Validators.required,
          Validators.minLength(3),
        ]),

        nickname: new FormControl('user?.username', [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl('u', [Validators.required]),
        phone: new FormControl('8', []),
        email: new FormControl('ma@jasf.com', [
          Validators.required,
          Validators.email,
        ]),
        photo: new FormControl('jkkl', [Validators.required]),
        role_id: new FormControl(1),
      },
      []
    );

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

    //inicializar el subject form
    this.subjectForm = new FormGroup(
      {
        subject: new FormControl('tkkkgg', [
          Validators.required,
          Validators.minLength(3),
        ]),
        teacher_id: new FormControl(2, [
          Validators.required,
          Validators.maxLength(1),
        ]),
        department_id: new FormControl(0, [
          Validators.required,
          Validators.minLength(1),
        ]),
      },
      []
    );
  }

  async ngOnInit() {}

  // insertamos los datos del formulario
  async onSubmit(): Promise<void> {
    try {
      console.log(this.userForm.value);

      this.userForm.value.date_of_birth = '1990-04-17';
      this.userForm.value.status = 2;

      let user: UserRegister = {
        userForm: this.userForm.value,
        locationForm: {
          id: 0,
          latitude: 41.385063,
          longitude: 2.987456,
          address: 'calle de quintal 25',
          city: 'Santiago',
          province: 'A Coruña',
        },
        teacherForm: this.teacherForm.value,
        subjectsForm: this.subjectForm.value,
      };

      const response = await this.usersService.Register(user);
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
      this.userForm.get(formcontrolName)?.hasError(valiador) &&
      this.userForm.get(formcontrolName)?.touched
    );
  }
}
