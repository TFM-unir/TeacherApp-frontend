import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';
import { TeachersAdminComponent } from './components/teachers-admin/teachers-admin.component';
import { StudentsAdminComponent } from './components/students-admin/students-admin.component';


@NgModule({
  declarations: [
    AdminControlPanelComponent,
    TeachersAdminComponent,
    StudentsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
