import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormRegisterComponent } from './components/form-register/form-register.component';

@NgModule({
  declarations: [FormRegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {}
