import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { TeacherModule } from '../teacher/teacher.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchEngineComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    TeacherModule,
    ReactiveFormsModule,
  ],
})
export class TeachersModule {}
