import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './components/form-register/form-register.component';

const routes: Routes = [{ path: 'register', component: FormRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
