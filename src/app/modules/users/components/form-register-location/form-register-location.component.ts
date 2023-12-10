import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private cc: ControlContainer) {}

  get formGroup() {
    return this.cc.control?.get(this.groupName);
  }

  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    const addressComponents = place.address_components;

    const city = addressComponents![2].short_name;
    const province = addressComponents![4].long_name;
    const lat = place.geometry?.location!.lat();
    const lng = place.geometry?.location!.lng();

    let form = this.formGroup;
    if (form) {
      form.value.address = place.formatted_address;
      form.value.province = province;
      form.value.city = city;
      form.value.latitude = lat;
      form.value.longitude = lng;
    }
  }
}

// Pruebas...
export function generateLocationFormGroup(): FormGroup {
  return new FormGroup({
    latitude: new FormControl('', []),
    longitude: new FormControl('', []),
    address: new FormControl('', []),
    city: new FormControl('Valencia', []),
    province: new FormControl('', []),
  });
}
