import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-contact',
  templateUrl: './teacher-contact.component.html',
  styleUrls: ['./teacher-contact.component.css']
})
export class TeacherContactComponent {

  private teacherService = inject(TeacherService);
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  teacher: TeacherProfile | any = {};
  displaySection: boolean = true;
  formulario: FormGroup;
  user: User | any = {};
  private coreService = inject(AuthService);
  chatsService = inject(ChatService)
  teacherId: number | any;

  constructor() {
    this.formulario = new FormGroup({
      textarea: new FormControl()
    })
  }

  ngOnInit() {
    this.activatedRout.params.subscribe(async (params: any) => {

      if (!localStorage.getItem('auth_token')) {
        this.router.navigate(["/teachers"]);
      }

      this.user = this.coreService.getDecodedToken();
      this.teacherId = params.teacherId;
      try {
        this.teacher = await this.teacherService.getTeacherById(this.teacherId);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };

    });
  }

  async onSubmit() {
    const text:string = this.formulario.value.textarea;
    if (text !== null && text !== "") {
      this.displaySection = false;
      const values = { message: text, boolean_teacher: false, userId: this.user.user_id, teacherId: Number(this.teacherId) }
      try {
        const response = await this.chatsService.contactTeacher(values);
      } catch (error) {
        console.error('Login error:', error);
      }

    } else {
      this.sweetAlert('Error al mandar el mensaje', 'error', 'Debes escribir el mensaje antes de enviarlo.')
    }
  }

  returnHome() {
    this.router.navigate(["/teachers"]);
  }

  sweetAlert(title: string, icon: string | any, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

}
