import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { NgxGpAutocompleteDirective } from '@angular-magic/ngx-gp-autocomplete';

@Component({
  selector: 'app-form-register-location',
  templateUrl: './form-register-location.component.html',
  styleUrls: ['./form-register-location.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // para poder comunicarse con el padre
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject(ControlContainer, { skipSelf: true, host: true }),
    },
  ],
})
export class FormRegisterLocationComponent {
  @Input() groupName = '';

  constructor() {}

  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    const addressComponents = place.address_components;

    // Opción 1. Obtención de detalles necesarios
    const street = addressComponents![1].short_name;
    const stNumber = addressComponents![0].short_name;
    const city = addressComponents![2].short_name;
    const province = addressComponents![4].long_name;
    const country = addressComponents![5].long_name;
    const postalCode = addressComponents![6].short_name;
    const lat = place.geometry?.location!.lat();
    const lng = place.geometry?.location!.lng();
    
    console.log('Calle: ', street);
    console.log('Número: ', stNumber);
    console.log('Ciudad: ', city);
    console.log('Província: ', province);
    console.log('País: ', country);    
    console.log('Código Postal: ', postalCode);
    console.log('Latitud: ', lat);
    console.log('Longitud: ', lng);
    
  }
}

// Pruebas...
// export function generateLocationFormGroup(): FormGroup {
//   return new FormGroup({
//     // latitude: new FormControl('', []),
//     // longitude: new FormControl('', []),
//     // address: new FormControl('', []),
//     // city: new FormControl('', []),
//     // province: new FormControl('', []),
//   });
// }