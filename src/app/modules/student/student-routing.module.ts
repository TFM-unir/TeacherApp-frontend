import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentControlPanelComponent } from './components/student-control-panel/student-control-panel.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentChatComponent } from './components/student-chat/student-chat.component';

const routes: Routes = [
  { path: 'profile/:studentId', component: StudentProfileComponent },  
  { path: 'chat', component: StudentChatComponent },
  { path: 'control/:studentId',component: StudentControlPanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
