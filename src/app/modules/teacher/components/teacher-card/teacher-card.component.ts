import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css'],
})
export class TeacherCardComponent {
  @Input() teacher!: TeacherProfile;
  @Input() showButtonProfile: boolean = true;
  @Input() showRating: boolean = true;

  router = inject(Router);

  //inject el servicio
  teacherServices = inject(TeacherService);

  // elimina un usuario
  async deleteUser(id: number): Promise<void> {
    alert('Estas seguro de borrar este usario?');

    // llamamos a la funcion borrar usuario del servicio
    let response = await this.teacherServices.deleteUser(id);

    // si el usuario se borra correctamente, retornamos al home

    /*if (response) {
      // como nos encontramos en el home, forzamos un reload
      const currentUrl = this.router.url;
      this.router
        .navigateByUrl('/test', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentUrl]);
        });
    }*/
  }
}
