import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassHour } from 'src/app/core/models/class.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import * as dayjs from 'dayjs';
import { User } from 'src/app/core/models/user.interface';
import { ClasshoursService } from 'src/app/core/services/classhours.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-teacher-control-panel',
  templateUrl: './teacher-control-panel.component.html',
  styleUrls: ['./teacher-control-panel.component.css'],
})
export class TeacherControlPanelComponent {

  private coreService = inject(AuthService);
  private teacherService = inject(TeacherService);
  private classHoursService = inject(ClasshoursService);
  private studentsService = inject(StudentService);
  disabled: string = 'all';
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  teacher: TeacherProfile | any = {};
  studentClass: ClassHour[] | any;
  students: any[] = [];
  teacherId: number | any;
  user: User | any;
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
      ]),
      address: new FormControl("", [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      subject: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      department_name: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
      ]),
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

        this.teacher = await this.teacherService.getTeacherByIdAllData(id);

      } catch (error) {
        console.log("ERROR: " + error);
      }

      try {
        this.studentClass = await this.teacherService.getAllClassByTeacherId(id);
      } catch (error) {
        alert(
          'Ocurrió un error al intentar recuperar las clases y bloques horarios. Por favor intentelo nuevamente.'
        );
        this.router.navigate(['/home']);
      }
      this.fillingForm(this.teacher)

      try {
        const classhours = await this.classHoursService.getAllUsersByTeacherId(id);
        classhours.forEach(async (item: any) => {
          const variab = [item.id_user1, item.id_user2, item.id_user3, item.id_user4, item.id_user5];
          for (let i = 0; i < variab.length; i++) {
            if (variab[i] !== null) {
              this.user = await this.studentsService.getStudentById(variab[i]);
              this.students.push({
                id: this.user.id,
                image: this.user.photo,
                name: this.user.name,
                class: item.day_of_week,
                start_class: item.start_time,
              });
            }
          }
        });
      } catch (error) {
        alert(
          'Ocurrió un error al intentar recuperar los alumnos. Por favor intentelo nuevamente.'
        );
        this.router.navigate(['/home'])
      }

    });
  }

  onSubmit() {

  }

  cancelClass() {

  }

  ChangePassword() {

  }

  newClass() {

  }

  chat() {

  }

  changeMenu(param:string) {
    this.disabled = param;
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
      class_mode_online: new FormControl(teacher.class_mode_online),
      class_mode_in_person: new FormControl(teacher.class_mode_in_person),
      experience: new FormControl(teacher.experience),
      price_hour: new FormControl(teacher.price_hour),
      about_me: new FormControl(teacher.about_me),
      address: new FormControl(teacher.address),
      subject: new FormControl(teacher.subject),
      department_name: new FormControl(teacher.department_name),
    });
  }

}
