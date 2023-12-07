import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css'],
})
export class MapSectionComponent {
  teachers: TeacherProfile[] | undefined;

  @ViewChild(MapInfoWindow) miInfoWindow: MapInfoWindow | any;

  zoom: number = 12;
  center: google.maps.LatLng = new google.maps.LatLng(40.41831, -3.70275);
  myposition: google.maps.LatLng | any = new google.maps.LatLng(
    40.41831,
    -3.70275
  );
  markerOptionsUser = {
    animation: google.maps.Animation.BOUNCE,
    icon: {
      url: '../../../../assets/userPosition.svg',
      scaledSize: new google.maps.Size(40, 40),
    },
  };
  markerOptionsTeachers = {
    animation: google.maps.Animation.BOUNCE,
    icon: {
      url: '../../../../assets/teacherPosition.svg',
      scaledSize: new google.maps.Size(40, 40),
    },
  };

  // revisar xk no funciona?
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false, // Deshabilitar control de street view
  };

  constructor(private teachersService: TeacherService) {}

  ngOnInit() {
    this.getAllTeachers();
    this.initiateGeolocation();
  }

  initiateGeolocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position);
      const { latitude, longitude } = position.coords;
      this.myposition = new google.maps.LatLng(latitude, longitude);
      this.center = this.myposition;
    });
  }

  openInfoWindow(miMarker: MapMarker) {
    this.miInfoWindow.open(miMarker);
  }

  async getAllTeachers(): Promise<void> {
    try {
      this.teachers = await this.teachersService.getAllTeachers();
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }
}
