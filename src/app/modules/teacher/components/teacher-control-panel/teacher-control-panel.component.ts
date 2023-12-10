import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassHour } from 'src/app/core/models/class.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-teacher-control-panel',
  templateUrl: './teacher-control-panel.component.html',
  styleUrls: ['./teacher-control-panel.component.css']
})
export class TeacherControlPanelComponent {

  private coreService = inject(AuthService);
  private teacherService = inject(TeacherService);
  disabled: boolean = true;
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  teacher: TeacherProfile | any = {};
  studentClass: ClassHour[] | any;
  teacherId: number | any;
  userId: number | any;
  formulario: FormGroup;
  role_id!: number;

  constructor() {
    this.formulario = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      nickname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      date_of_birth: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      photo: new FormControl("", [Validators.required]),
      class_mode_online: new FormControl(),
      class_mode_in_person: new FormControl(),
      experience: new FormControl("", [
        Validators.required,
        Validators.maxLength(2)
      ]),
      price_hour: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      about_me: new FormControl("", [
        Validators.required,
        Validators.maxLength(1000),
      ])
    });
  }

  async ngOnInit() {
    this.activatedRout.params.subscribe(async (params: any) => {
      let id = Number(params.teacherId);
      try {
        this.userId = Number(await this.coreService.getUserId());

        if (id !== this.userId) {
          //comprobamos que no se mete en otro perfil y si lo hace redirigimos al suyo
          this.router.navigate(['/teacher', 'control', this.userId])
          return;
        }

        this.teacher = await this.teacherService.getTeacherById(id);

      } catch (error) {
        console.log("ERROR: " + error);
      }

      try {
        this.studentClass = await this.teacherService.getAllClassByTeacherId(id);
      } catch (error) {
        alert(
          'Ocurrió un error al intentar recuperar las clases y bloques horarios. Por favor intentelo nuevamente.'
        );
        this.router.navigate(['/home'])
      }

      this.fillingForm(this.teacher)

    });
  }

  onSubmit() {

  }

  cancelClass() {

  }

  fillingForm(teacher: TeacherProfile) {
    this.formulario = new FormGroup({
      name: new FormControl(teacher.name),
      nickname: new FormControl(teacher.nickname),
      email: new FormControl(teacher.email),
      phone: new FormControl(teacher.phone),
      date_of_birth: new FormControl(dayjs(teacher.date_of_birth).format('YYYY-MM-DD')),
      password: new FormControl(""),
      photo: new FormControl(teacher.photo),
      class_mode_online: new FormControl(teacher.class_online),
      class_mode_in_person: new FormControl(teacher.class_in_person),
      experience: new FormControl(teacher.experience),
      price_hour: new FormControl(teacher.price_hour),
      about_me: new FormControl(teacher.about_me)
    });
  }

}
