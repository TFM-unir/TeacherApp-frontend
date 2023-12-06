import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherControlPanelComponent } from './components/teacher-control-panel/teacher-control-panel.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { TeacherContactComponent } from './components/teacher-contact/teacher-contact.component';
import { TeacherChatComponent } from './components/teacher-chat/teacher-chat.component';
import { TeacherRateComponent } from './components/teacher-rate/teacher-rate.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TeacherControlPanelComponent,
    TeacherProfileComponent,
    TeacherContactComponent,
    TeacherChatComponent,
    TeacherRateComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule
  ]
})
export class TeacherModule { }
