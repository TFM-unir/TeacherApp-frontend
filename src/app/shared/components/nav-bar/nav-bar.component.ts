import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  router = inject(Router);
  authService = inject(AuthService)

  //Inyectamos el servicio del core
  private coreService = inject(AuthService);
  //Declaramos la variable users que contendra todos los datos del usuario
  user: User | any;
  //Decalramos booleana variable que permita que se pinte de color si esteacher o student
  booleanPaint: boolean = false;

  ngOnInit() {
  };

  onClickLogout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/users', 'login']);
  };

  isLogged() {
    if (localStorage.getItem('auth_token')) return true;
    return false;
  };

  userTypeLogo(): string {
    if (this.authService.getUserRoleForStyles() === 'admin' || this.authService.getUserRoleForStyles() === 'teacher') {
    return '../../../../assets/logo_TeacherAdmin.png'
    };
    return '../../../../assets/logo_student.png'
  };
}
