import { Component, inject } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { Ratings } from 'src/app/core/models/ratings.interface';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {

  //Inyectamos el servicio
  private teacherService = inject(TeacherService);
  //inyectamos activatedroute
  activatedRout = inject(ActivatedRoute);
  //inyectamos el router
  router = inject(Router);
  //Declaramos la variable teacher
  teacher: TeacherProfile | any;
  //Creamos la variable rating
  rating: any = 0;




  ngOnInit(): void {

    this.activatedRout.params.subscribe(async (params: any) => {
      let id = params.teacherId;
      try {
        this.teacher = await this.teacherService.getTeacherById(id);
        console.log(this.teacher);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      }

      try {
        this.rating = await this.teacherService.getAverageRatingByTeacherId(id);
        this.rating = parseFloat(this.rating.media_ratings).toFixed(1);
        console.log(this.rating);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar el rating del teacher. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      }

    });
  };

  contactTeacher() {
    if (!localStorage.getItem('auth_token')) {
      this.router.navigate(["/users", "register"]);
    }
  }



  //   try {
  //     const response = await this.teacherService.getAll();
  //     console.log('response', response);
  //   } catch (error: any) {

  //   }

  // }



}
