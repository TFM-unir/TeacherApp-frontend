import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';

const routes: Routes = [
  { path: 'control/:adminId', component: AdminControlPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
