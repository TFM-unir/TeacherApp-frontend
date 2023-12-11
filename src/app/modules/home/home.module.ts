import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeroSectionComponent } from './components/home/home-components/hero-section/hero-section.component';
import { MapSectionComponent } from './components/home/home-components/map-section/map-section.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { JoinTeacherAppComponent } from './components/home/home-components/join-teacher-app/join-teacher-app.component';

@NgModule({
  declarations: [HomeComponent, HeroSectionComponent, MapSectionComponent, JoinTeacherAppComponent],
  imports: [CommonModule, HomeRoutingModule, GoogleMapsModule],
  exports: [HomeComponent, HeroSectionComponent, MapSectionComponent]
})
export class HomeModule { }
