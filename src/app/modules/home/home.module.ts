import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeroSectionComponent } from './components/home/home-components/hero-section/hero-section.component';
import { MapSectionComponent } from './components/home/home-components/map-section/map-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    MapSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
