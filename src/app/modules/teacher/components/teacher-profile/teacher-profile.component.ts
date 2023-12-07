import { Component, inject } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { ClassHour } from 'src/app/core/models/class.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.interface';
import { Ratings } from 'src/app/core/models/ratings.interface';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {

  //Inyectamos el servicio
  private teacherService = inject(TeacherService);
  //Inyectamos el servicio del core
  private coreService = inject(AuthService);
  //inyectamos activatedroute
  activatedRout = inject(ActivatedRoute);
  //inyectamos el router
  router = inject(Router);
  //Declaramos la variable teacher
  teacher: TeacherProfile | any;
  //Creamos la variable rating
  rating: any = 0;
  // Esta variable debe ser seteada dependiendo si el usuario está autenticado o no
  isLoggedIn: boolean = false;
  // Esta variable debe ser seteada dependiendo si el usuario tiene clases con el profesor o no
  hasClasses: boolean = false;
  // respuesta de clases
  studentClass: ClassHour[] | any;
  //Declaramos la variable users que contendra todos los datos del usuario
  user: User | any;
  //Declaramos la variable de toda la info de los ratings que se le han hecho a ese profesor
  allRatings: Ratings[] | any;
  ultimos4Ratings: Ratings[] | any;


  ngOnInit(): void {

    this.activatedRout.params.subscribe(async (params: any) => {
      let id = params.teacherId;
      try {
        this.teacher = await this.teacherService.getTeacherById(id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

      try {
        this.rating = await this.teacherService.getAverageRatingByTeacherId(id);
        this.rating = parseFloat(this.rating.media_ratings).toFixed(1);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar el rating del teacher. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

      try {
        this.studentClass = await this.teacherService.getAllClassByTeacherId(id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar las clases y bloques horarios. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

      this.user = this.coreService.getDecodedToken();

      if (localStorage.getItem('auth_token')) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      };

      this.hasClasses = this.studentClass.some((item: ClassHour) => {
        return (
          item.id_user1 === this.user.user_id ||
          item.id_user2 === this.user.user_id ||
          item.id_user3 === this.user.user_id ||
          item.id_user4 === this.user.user_id ||
          item.id_user5 === this.user.user_id
        );
      });

      // nos traemos la información del rating relacionado con el usuario y el profesor
      try {
        this.allRatings = await this.teacherService.getRatingsByTeacherId(id);
        console.log(this.rating);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar los ratings del profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      }
      if (this.allRatings.length > 4) {
        this.ultimos4Ratings = this.allRatings.slice(-4);
        console.log(this.ultimos4Ratings);
      } else {
        this.ultimos4Ratings = this.allRatings;
        console.log(this.ultimos4Ratings);
      };
    });
  };



  contactTeacher() {
    if (!localStorage.getItem('auth_token')) {
      this.router.navigate(["/users", "register"]);
    } else {
      this.activatedRout.params.subscribe(async (params: any) => {
        let id = params.teacherId;
        this.router.navigate(["/teacher", "contact", `${id}`]);
      });
    }
  };

  startChat() {
    this.router.navigate(["student", "chat"])
  };

  rateTeacher() {
    this.activatedRout.params.subscribe(async (params: any) => {
      let id = params.teacherId;
      this.router.navigate(["teacher", "rate", `${id}`])
    });
  };





  //   try {
  //     const response = await this.teacherService.getAll();
  //     console.log('response', response);
  //   } catch (error: any) {

  //   }

  // }



};
