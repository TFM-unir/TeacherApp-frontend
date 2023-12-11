import { Component, ViewChild, inject } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css'],
})
export class MapSectionComponent {
  
  teachers: TeacherProfile[] | undefined;
  selectedTeacher: TeacherProfile | null = null;
  miMarkers: any[] = [];
  router = inject(Router);
  authService = inject(AuthService);

  @ViewChild(MapInfoWindow) miInfoWindow: MapInfoWindow | any;

  zoom: number = 10;
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

      // Obtener profes y calcular sus distancias sólo cuando tengamos nuestra posición asignada.
      this.getAllTeachers();
    });
  }

  openInfoWindow(teacher: TeacherProfile) {
    // Asignar el profe que se ha clickado el marcador a la card de profe
    this.selectedTeacher = teacher;
  }

  selectTeacher(teacher: TeacherProfile): void {
    this.selectedTeacher = teacher;
    this.center = new google.maps.LatLng(this.selectedTeacher.latitude, this.selectedTeacher.longitude);
    this.zoom = 13;
  }
  
  eraseMarkedTeacher() {
    this.selectedTeacher = null;
    this.zoom = 10;
    this.center = this.myposition;
  }

  navigateToTeacherProfile(id: any) {
    this.router.navigate(['/teachers','profile',id]);

  }

  async getAllTeachers(): Promise<void> {
    try {
      this.teachers = await this.teachersService.getAllTeachers();

      // Calcular distancia a posición usuario y asignarla a cada profesor. Después ordenar por puntuación y por distancia los que no tienen puntuación
      if (this.myposition && this.teachers) {
        this.teachers.forEach((teacher) => {
          const teacherPosition = new google.maps.LatLng(teacher.latitude, teacher.longitude);
          teacher.distance = google.maps.geometry.spherical.computeDistanceBetween(this.myposition, teacherPosition) / 1000;
        });

        // Separar los que tienen rating de los que no
        const teachersWithRating = this.teachers.filter(teacher => teacher.rating);
        const teachersWithoutRating = this.teachers.filter(teacher => !teacher.rating);
  
        // Ordenar por puntuación más alta los teachers con rating
        teachersWithRating.sort((teacherA, teacherB) => teacherB.rating! - teacherA.rating!);
                
        // Ordenar por distancia más cercana los que no tienen rating
        teachersWithoutRating.sort((teacherA, teacherB) => teacherA.distance - teacherB.distance);
  
        // Concatenar los dos arrays
        this.teachers = teachersWithRating.concat(teachersWithoutRating);
      }
    } catch (error) {
      console.error('Error fetching or sorting teachers:', error);
    }
  };
  
  
}
