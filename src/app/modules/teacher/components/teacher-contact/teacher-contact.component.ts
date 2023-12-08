import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-teacher-contact',
  templateUrl: './teacher-contact.component.html',
  styleUrls: ['./teacher-contact.component.css']
})
export class TeacherContactComponent {

  private teacherService = inject(TeacherService);
  router = inject(Router);
  activatedRout = inject(ActivatedRoute);
  private coreService = inject(AuthService);
  teacher: TeacherProfile | any;

  ngOnInit() {
    this.activatedRout.params.subscribe(async (params: any) => {

      if (! localStorage.getItem('auth_token')) {
        this.router.navigate(["/teachers"]);
      } 

      let id = params.teacherId;      
      try {
        this.teacher = await this.teacherService.getTeacherById(id);
      } catch (error) {
        alert("Ocurrió un error al intentar recuperar al profesor. Por favor intentelo nuevamente.");
        this.router.navigate(["/teachers"]);
      };
      console.log(this.teacher)
      
      

    });
  }

}
