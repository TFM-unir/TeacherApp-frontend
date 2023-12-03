import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentControlPanelComponent } from './components/student-control-panel/student-control-panel.component';


@NgModule({
  declarations: [
    StudentControlPanelComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
