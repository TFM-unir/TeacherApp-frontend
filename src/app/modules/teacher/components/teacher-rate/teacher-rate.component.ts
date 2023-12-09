import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RatingsService } from 'src/app/core/services/ratings.service';
import Swal from 'sweetalert2';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';


@Component({
  selector: 'app-teacher-rate',
  templateUrl: './teacher-rate.component.html',
  styleUrls: ['./teacher-rate.component.css']
})
export class TeacherRateComponent {

  displaySection:boolean = true;
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  teacherId: number | any;
  userId: number = 0;
  user: User | any = {};
  private coreService = inject(AuthService);
  ratingsService = inject(RatingsService);
  formulario: FormGroup;
  teacher: TeacherProfile | any = {};
  private teacherService = inject(TeacherService);
  prevRating:number = 0;
  prevComment:string = "";

  selectedRating = 0;
  rating: number = 0;
  stars: any[] = [
    {
      id: 1,
      icon: 'star',
      class: 'grey star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'grey star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'grey star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'grey star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'grey star-hover star'
    }

  ];

  constructor() {
    this.formulario = new FormGroup({
      textarea: new FormControl()
    })
  }

  async ngOnInit() {
    this.activatedRout.params.subscribe(async (params: any) => {

      if (!localStorage.getItem('auth_token')) {
        this.router.navigate(["/teachers"]);
      }
      this.user = this.coreService.getDecodedToken();
      this.userId = Number(this.user.user_id);
      this.teacherId = Number(params.teacherId);
      try {
        this.teacher = await this.teacherService.getTeacherById(this.teacherId);
        const [result] = await this.ratingsService.getRatingsByUserAndTeacher(this.userId, this.teacherId);
        if(result.length > 0){
          console.log(result[0].rating)
          this.displaySection = false;
          this.prevRating = result[0].rating;
          this.prevComment = result[0].comment_student;
        }
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };
    });
  }

  selectStar(value: any): void {
    this.rating = value;
    this.stars.filter((star) => {
      if (star.id <= value) {
        star.class = 'star-gold star';
      } else {
        star.class = 'star-gray star';
      }
      return star;
    });

  }

  onSubmit() {
    const text: string = this.formulario.value.textarea;
    const values = { rating: this.rating, comment_student: text, teacher_id: Number(this.teacherId), user_id: this.userId }
    const title: string = "Enviar Rating";
    const textAlert: string = "Vas a puntuar a "+this.teacher.name+" con: Puntuación: " + this.rating + ", Comentario: " + text;
    const icon: string = 'warning';
    const result = this.sweetAlert(title, icon, textAlert, values);
  }


  sweetAlert(title: string, icon: string | any, text: string, values: any): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendData(values);
        Swal.fire({
          title: "Acción realizada",
          text: "Gracias!",
          icon: "success",
        });
        this.router.navigate(["/teacher/profile/"+this.teacherId]);
      }
    });
  }

  async sendData(values: any) {
    try {
      const response = await this.ratingsService.newRating(values);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  returnHome(){
    this.router.navigate(["/teacher/profile/"+this.teacherId]);
  }

}
