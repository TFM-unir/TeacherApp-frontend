import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherControlPanelComponent } from './components/teacher-control-panel/teacher-control-panel.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherRateComponent } from './components/teacher-rate/teacher-rate.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { TeacherContactComponent } from './components/teacher-contact/teacher-contact.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { studentGuard } from 'src/app/core/guards/student.guard';
import { teacherGuard } from 'src/app/core/guards/teacher.guard';

const routes: Routes = [
  { path: 'chat/:teacherId', canActivate: [authGuard, teacherGuard], component: TeacherChatComponent },
  { path: 'profile/:teacherId', component: TeacherProfileComponent },
  { path: 'contact/:teacherId', canActivate: [authGuard, studentGuard], component: TeacherContactComponent },
  { path: 'rate/:teacherId', canActivate: [authGuard, studentGuard], component: TeacherRateComponent },
  { path: 'control/:teacherId', canActivate: [authGuard, teacherGuard], component: TeacherControlPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeacherRoutingModule { }
