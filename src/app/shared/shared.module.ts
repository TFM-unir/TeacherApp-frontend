import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GoogleMapsModule
  ],
  exports: [
    NavBarComponent, 
    FooterComponent,
    MapComponent
  ]
})
export class SharedModule { }