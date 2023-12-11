import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';

const routes: Routes = [
  { path: '', component: SearchEngineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
