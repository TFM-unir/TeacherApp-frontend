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

  //Inyectamos auth service
  authService = inject(AuthService);

  ngOnInit() {
    console.log(this.authService.getUserRoleName());
  }
}
