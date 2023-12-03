import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register-subjects',
  templateUrl: './form-register-subjects.component.html',
  styleUrls: ['./form-register-subjects.component.css'],
})
export class FormRegisterSubjectsComponent {
  // variable para manejar el formulario del subject
  subjectForm: FormGroup;

  usersService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  constructor() {
    //inicializar subject form
    this.subjectForm = new FormGroup({});
  }

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    return (
      this.subjectForm.get(formcontrolName)?.hasError(valiador) &&
      this.subjectForm.get(formcontrolName)?.touched
    );
  }
}
