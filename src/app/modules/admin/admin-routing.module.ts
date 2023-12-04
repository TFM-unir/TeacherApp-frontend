import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';
import { TeachersAdminComponent } from './components/teachers-admin/teachers-admin.component';
import { StudentsAdminComponent } from './components/students-admin/students-admin.component';

const routes: Routes = [
  { path: ':adminId', component: AdminControlPanelComponent },
  { path: ':adminId/teachers', component: TeachersAdminComponent },
  { path: ':adminId/students', component: StudentsAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
