import { Component, inject } from '@angular/core';
import { User } from './core/models/user.interface';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeacherApp-frontend';

  //Inyectamos el servicio del core
  authService = inject(AuthService);
  //Declaramos la variable users que contendra todos los datos del usuario
  user: User | any;
  //Decalramos booleana variable que permita que se pinte de color si esteacher o student
  booleanPaint: boolean = false

  ngOnInit() {
    console.log(this.authService.getUserRoleForStyles());
    
  }
}
