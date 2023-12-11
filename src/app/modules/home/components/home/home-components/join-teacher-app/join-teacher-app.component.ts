import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-join-teacher-app',
  templateUrl: './join-teacher-app.component.html',
  styleUrls: ['./join-teacher-app.component.css']
})
export class JoinTeacherAppComponent {
  router = inject(Router);
  authService = inject(AuthService)
}
