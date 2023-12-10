import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-student-control-panel',
  templateUrl: './student-control-panel.component.html',
  styleUrls: ['./student-control-panel.component.css']
})

export class StudentControlPanelComponent {

  authService = inject(AuthService);
}
