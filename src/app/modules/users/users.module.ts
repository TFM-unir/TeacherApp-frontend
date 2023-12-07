import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormRegisterUserComponent } from './components/form-register-user/form-register-user.component';
import { FormRegisterTeacherComponent } from './components/form-register-teacher/form-register-teacher.component';
import { FormRegisterLocationComponent } from './components/form-register-location/form-register-location.component';
import { FormRegisterSubjectsComponent } from './components/form-register-subjects/form-register-subjects.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [
    FormRegisterComponent,
    FormRegisterUserComponent,
    FormRegisterTeacherComponent,
    FormRegisterLocationComponent,
    FormRegisterSubjectsComponent,
    FormLoginComponent,
    MapaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    GoogleMapsModule,
  ],
})
export class UsersModule {}
