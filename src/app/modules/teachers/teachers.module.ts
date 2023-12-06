import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';


@NgModule({
  declarations: [
    SearchEngineComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
  ]
})
export class TeachersModule { }
