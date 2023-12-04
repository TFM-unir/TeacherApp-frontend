import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherControlPanelComponent } from './components/teacher-control-panel/teacher-control-panel.component';

const routes: Routes = [
  { path: ':teacherName', component: TeacherControlPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeacherRoutingModule { }
