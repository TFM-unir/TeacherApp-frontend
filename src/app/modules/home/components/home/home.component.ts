import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  authService = inject(AuthService);
  activatedRout = inject(ActivatedRoute);
  router = inject(Router);
  private coreService = inject(AuthService);
  userRole: number | any;

  constructor() {
  }

  ngOnInit() {
    
    //Redirijo a los teachers al panel de control del teacher
    this.activatedRout.params.subscribe((params: any) => {
      if (localStorage.getItem('auth_token')) {
        this.userRole! = this.coreService.getUserRole();
        if(this.userRole === 2){
          this.router.navigate(["/teacher/control/"+params.teacherId]);
        }
      }
      
    });
  }

}

