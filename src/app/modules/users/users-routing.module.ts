import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MapaComponent } from './components/mapa/mapa.component';

const routes: Routes = [
  { path: 'register', component: FormRegisterComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'mapa', component: MapaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
