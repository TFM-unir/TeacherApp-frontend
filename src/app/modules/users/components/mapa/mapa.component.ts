import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  // //para crear el info window tenemos que generar una vista html para ello vamos usar un decorador @ViewChild()

  @ViewChild(MapInfoWindow) miInfoWindow: MapInfoWindow | any;

  zoom: number = 8;
  center: google.maps.LatLng = new google.maps.LatLng(40, -3);
  myposition: google.maps.LatLng | any;
  markerOptions = {
    animation: google.maps.Animation.BOUNCE,
    icon: {
      url: 'http://pngfind.com/pngs/m/6-62037_check-mark-icon-png-transparent-png.png',
      scaledSize: new google.maps.Size(40, 40),
    },
  };
  ngOnInit() {
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
}
