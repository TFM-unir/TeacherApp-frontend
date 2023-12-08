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
  myposition: google.maps.LatLng | any;
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
    this.initiateGeolocation();
  }

  initiateGeolocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.myposition = new google.maps.LatLng(latitude, longitude);
      this.center = this.myposition;

      // Once myposition is obtained, calculate distances and sort teachers
      this.getAllTeachers();
    });
  }

  openInfoWindow(miMarker: MapMarker) {
    this.miInfoWindow.open(miMarker);
  }

  async getAllTeachers(): Promise<void> {
    try {
      this.teachers = await this.teachersService.getAllTeachers();
      
      // Calculate and assign distance to each teacher
      if (this.myposition && this.teachers) {
        this.teachers.forEach((teacher) => {
          const teacherPosition = new google.maps.LatLng(teacher.latitude, teacher.longitude);
          teacher.distance = google.maps.geometry.spherical.computeDistanceBetween(this.myposition, teacherPosition) / 1000;
        });

        // Sort teachers by distance
        this.teachers.sort((teacherA, teacherB) => teacherA.distance! - teacherB.distance!);
        console.log(this.teachers);
        
      }
    } catch (error) {
      console.error('Error fetching or sorting teachers:', error);
    }
    console.log(this.teachers);
  };
}
