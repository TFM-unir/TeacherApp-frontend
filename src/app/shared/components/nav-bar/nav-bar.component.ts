import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  router = inject(Router);
  authService = inject(AuthService)

  onClickLogout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/users', 'login']);
  };
}
