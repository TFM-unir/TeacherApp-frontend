import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentControlPanelComponent } from './components/student-control-panel/student-control-panel.component';

const routes: Routes = [
  { path: ':studentName', component: StudentControlPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
