import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherControlPanelComponent } from './components/teacher-control-panel/teacher-control-panel.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherRateComponent } from './components/teacher-rate/teacher-rate.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { TeacherContactComponent } from './components/teacher-contact/teacher-contact.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: 'chat', canActivate: [authGuard], component: TeacherChatComponent },
  { path: 'profile/:teacherId', component: TeacherProfileComponent },
  { path: 'contact/:teacherId', component: TeacherContactComponent },
  { path: 'rate/:teacherId', canActivate: [authGuard], component: TeacherRateComponent },
  { path: ':teacherId', component: TeacherControlPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeacherRoutingModule { }
