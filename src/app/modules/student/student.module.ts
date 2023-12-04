import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentControlPanelComponent } from './components/student-control-panel/student-control-panel.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentChatComponent } from './components/student-chat/student-chat.component';


@NgModule({
  declarations: [
    StudentControlPanelComponent,
    StudentProfileComponent,
    StudentChatComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
