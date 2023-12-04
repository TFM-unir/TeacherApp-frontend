import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  authService = inject(AuthService);
  
  constructor() {
    console.log(this.authService.getUserRoleName());
    console.log(this.authService.getUserId());
    console.log(this.authService.getUserName());
  }
}
