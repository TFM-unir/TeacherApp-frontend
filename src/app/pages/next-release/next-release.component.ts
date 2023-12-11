import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-next-release',
  templateUrl: './next-release.component.html',
  styleUrls: ['./next-release.component.css']
})
export class NextReleaseComponent {
  
  router = inject(Router);  

  retornar(){
    this.router.navigate(['/home']);
  }
}
