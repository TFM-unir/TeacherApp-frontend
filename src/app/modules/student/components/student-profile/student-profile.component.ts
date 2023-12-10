import { Component, ViewChild, inject } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Ratings } from 'src/app/core/models/ratings.interface';
import { Student } from 'src/app/core/models/student.interface';
import { Subject } from 'src/app/core/models/subject.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  //Inyectamos el servicio se usuario
  private studentService = inject(StudentService);
  //Inyectamos el servicio del core
  private coreService = inject(AuthService);
  //inyectamos activatedroute
  activatedRout = inject(ActivatedRoute);
  //inyectamos el router
  router = inject(Router);
  //Creamos la variable rating
  rating: Ratings | any;
  //Declaramos la variable student que contendra todos los datos del usuario
  student: Student | any;
  // declaramos la variable subject
  subject: Subject | any;
  // declaramos la variable teacher
  teacher: TeacherProfile | any;
  //Declaramos la variable user
  user: User | any;
  //Declaramos el rating booleadno para poder mostrar dependiendo de ello
  ratingBool: boolean = false;


  //Variables del google maps
  //Config para mapa
  @ViewChild(MapInfoWindow) miInfoWindow: MapInfoWindow | any;

  zoom: number = 12;
  center: google.maps.LatLng | any;
  myposition: google.maps.LatLng | any;
  markerOptions = {
    animation: google.maps.Animation.BOUNCE,
    icon: {
      url: '../../../../assets/userPosition.svg',
      scaledSize: new google.maps.Size(40, 40),
    },
  };

  ngOnInit(): void {

    this.activatedRout.params.subscribe(async (params: any) => {
      let id = params.studentId;
      try {
        this.student = await this.studentService.getStudentById(id);
        this.myposition = new google.maps.LatLng(
          this.student.latitude,
          this.student.longitude);
        this.center = new google.maps.LatLng(this.student.latitude, this.student.longitude);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al aulumno. Por favor intentelo nuevamente.");
        this.router.navigate([`/teacher/${id}`]);
      };
      try {
        this.subject = await this.studentService.getSubjectById(id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar la asignatira. Por favor intentelo nuevamente.");
        this.router.navigate([`/teacher/${id}`]);
      };

      this.user = this.coreService.getDecodedToken();

      try {
        this.teacher = await this.studentService.getTeacherById(this.user.user_id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate([`/teacher/${id}`]);
      }

      try {
        this.rating = await this.studentService.getRatingByUserIdAndTeacherId(id, this.teacher.id);
        console.log(this.rating)
        if (this.rating) {
          this.ratingBool = true
          console.log(this.ratingBool)
        } else {
          this.ratingBool = false
          console.log(this.ratingBool)
        }
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar el rating del teacher. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

    });
  };

  startChat() {
    this.router.navigate(["teacher", "chat"])
  };

  finish() {
    this.activatedRout.params.subscribe(async (params: any) => {
      let id = params.studentId;
      this.router.navigate(["teacher", `${id}`])
    });
  };

};