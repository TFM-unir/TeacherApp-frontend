import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { ClassHour } from 'src/app/core/models/class.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.interface';
import { Ratings } from 'src/app/core/models/ratings.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
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
  // declaramos la variable para pintar las 
  ultimos4Ratings: Ratings[] | any;
  //declaramos la variable para traernos todas las clases qe el profesor dicta
  allClases: ClassHour | any;
  //Declaramos la variable que valida como boolean si el hay algún slot disponible
  isSlotNotFull: any;
  //Declaramos la variable de respuesta del put
  updateReturn: any;
  //Clave empty slot
  emptySlot: any;
  //Declaramos el array de enroll
  enrolStudent: any;
  //Declaramos la variable hoverable
  hoverable: boolean[] = [];
  //Declaramos el boolean de rating
  ratingBool: boolean = false;

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
        console.log(this.rating)
        if (isNaN(this.rating) || !this.rating) {
          this.ratingBool = false
          console.log(this.ratingBool)
        } else {
          this.ratingBool = true
          console.log(this.ratingBool);
        }
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar el rating del teacher. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

      try {
        this.studentClass = await this.teacherService.getAllClassByTeacherId(id);
        console.log(this.studentClass)
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
      // Con esto vemos si aún hay clases disponibles
      this.isSlotNotFull = this.studentClass.map((item: ClassHour) => {
        return (
          item.id_user1 === null ||
          item.id_user2 === null ||
          item.id_user3 === null ||
          item.id_user4 === null ||
          item.id_user5 === null
        );
      });

      // nos traemos la información del rating relacionado con el usuario y el profesor
      try {
        this.allRatings = await this.teacherService.getRatingsByTeacherId(id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar los ratings del profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      }
      if (this.allRatings.length > 2) {
        this.ultimos4Ratings = this.allRatings.slice(-2);
      } else {
        this.ultimos4Ratings = this.allRatings;
      };

      this.enrolStudent = this.studentClass.map((item: ClassHour) => {
        return (
          item.id_user1 === this.user.user_id ||
          item.id_user2 === this.user.user_id ||
          item.id_user3 === this.user.user_id ||
          item.id_user4 === this.user.user_id ||
          item.id_user5 === this.user.user_id
        );
      });
      this.hoverable = Array(this.studentClass.length).fill(false);


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

  async enrollClass(slot: ClassHour) {
    try {
      console.log(slot)
      const slotValue = (slot: any): string | null => {
        for (const key in slot) {
          if (slot.hasOwnProperty(key) && slot[key] === null) {
            return key;
          }
        }
        return null;
      };
      this.emptySlot = slotValue(slot); // Llamar a la función para obtener la clave
      this.updateReturn = await this.teacherService.UpdateClassByStudentIdAndClassId(this.user.user_id, slot, this.emptySlot);
      alert("Se ha inscrito correctamente en la asignatira");
      this.reloadCurrentRoute()
    } catch (error) {
      console.log(error)
    };
  };

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  };

  toggleHover(index: number) {
    this.hoverable[index] = !this.hoverable[index];
  };

  unenrollClass(slot: ClassHour) {

  }

};
