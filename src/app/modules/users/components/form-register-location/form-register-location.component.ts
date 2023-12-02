import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-register-location',
  templateUrl: './form-register-location.component.html',
  styleUrls: ['./form-register-location.component.css'],
})
export class FormRegisterLocationComponent {
  // variable para manejar el formulario del location
  locationForm: FormGroup;

  usersService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  constructor() {
    //inicializar location form
    this.locationForm = new FormGroup({});
  }

  async onSubmit(): Promise<void> {}
}
