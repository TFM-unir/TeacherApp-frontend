import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';


@NgModule({
  declarations: [
    AdminControlPanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
