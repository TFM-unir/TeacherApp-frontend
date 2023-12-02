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
        teacherForm: {
          id: 0,
          experience: 0,
          class_mode: '',
          price_hour: 0,
          about_me: '',
        },
        locationForm: {
          id: 0,
          latitude: 41.385063,
          longitude: 2.987456,
          address: 'calle de quintal 25',
          city: 'Santiago',
          province: 'A Coruña',
        },
        subjectsForm: [],
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
