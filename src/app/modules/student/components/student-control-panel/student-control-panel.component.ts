import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { ClassHour } from 'src/app/core/models/class.interface';
import { Student } from 'src/app/core/models/student.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-control-panel',
  templateUrl: './student-control-panel.component.html',
  styleUrls: ['./student-control-panel.component.css']
})
export class StudentControlPanelComponent {

  disabled: string = "all";
  formulario: FormGroup;
  teacher: TeacherProfile | any;
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  studentId!: number;
  userId!: number;
  private coreService = inject(AuthService);
  student: Student | any;
  private studentsService = inject(StudentService)
  studentClass: ClassHour[] | any;
  private teachersService = inject(TeacherService);
  teachers: any[] = [];
  isTeacher:boolean = false;


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
      address: new FormControl("", [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    });
  }

  ngOnInit() {
    this.activatedRout.params.subscribe(async (params: any) => {
      this.studentId = Number(params.studentId);
      try {
        this.userId = Number(await this.coreService.getUserId());

        if (this.studentId !== this.userId) {
          //comprobamos que no se mete en otro perfil y si lo hace redirigimos al suyo
          this.router.navigate(['/student', 'control', this.userId])
          return;
        }

        this.student = await this.studentsService.getStudentById(this.studentId);

      } catch (error) {
        this.sweetAlert('Error', 'error', `Ocurrió un error al intentar recuperar los datos de tu perfil. ${error}`);
      }

      try {
        this.studentClass = await this.studentsService.getClassByStudentId(this.studentId);
        this.studentClass.forEach(async (item: any) => {
          this.teacher = await this.teachersService.getTeacherById(item.teacher_id);
          this.teachers.push({
            id: this.teacher.id,
            name: this.teacher.name,
            photo: this.teacher.photo,
            class: this.teacher.subject,
            day: item.day_of_week,
            start_time: item.start_time,
          });

        });        
      } catch (error) {
        this.sweetAlert('Error', 'error', `Ocurrió un error al intentar recuperar las clases y bloques horarios. Por favor intentelo nuevamente. ${error}`);

        this.router.navigate(['/home']);
      }
      this.fillingForm(this.student);

      try {
        this.teacher = await this.teachersService.getTeacherByUserId(this.student.id);
        if(this.teacher.length > 0){
          this.isTeacher = true;
        }
      } catch (error) {
        this.sweetAlert('Error', 'error', `No se ha podido recuperar información sobre su usuario. ${error}`);
      }

    });
  }

  async onSubmit() {
    try {
      const formValues = this.formulario.value;
      const obj = {
        name: formValues.name,
        nickname: formValues.nickname,
        email: formValues.email,
        phone: formValues.phone,
        update_date: dayjs().format('YYYY-MM-DD HH-mm-ss'),
        date_of_birth: formValues.date_of_birth,
        photo: formValues.photo,
        latitude: this.student.latitude,
        longitude: this.student.longitud,
        address: formValues.address,
        city: this.student.city,
        province: this.student.province,
      }
      const result = await this.studentsService.updateStudentbyId(this.studentId, obj);
      this.sweetAlert('Actualizar perfil', 'success', 'Su perfil ha sido actualizado');
    } catch (error) {
      this.sweetAlert('Error', 'error', `Ocurrió un error al intentar actualizar los datos. Por favor intentelo nuevamente. ${error}`);
    }
  }

  perfil(id:number){
    this.router.navigate(['/teacher', 'profile', id]);
  }

  changeMenu(str: string) {
    this.disabled = str;
  }

  ChangePassword() {
    
  }

  fillingForm(student: Student) {
    this.formulario = new FormGroup({
      name: new FormControl(student.name),
      nickname: new FormControl(student.nickname),
      email: new FormControl(student.email),
      phone: new FormControl(student.phone),
      date_of_birth: new FormControl(dayjs(student.date_of_birth).format('YYYY-MM-DD')),
      //password: new FormControl(""),
      photo: new FormControl(student.photo),
      address: new FormControl(student.address),
    });
  }

  sweetAlert(title: string, icon: string | any, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

}