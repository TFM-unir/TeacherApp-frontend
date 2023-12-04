import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherControlPanelComponent } from './components/teacher-control-panel/teacher-control-panel.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';


@NgModule({
  declarations: [
    TeacherControlPanelComponent,
    TeacherProfileComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
