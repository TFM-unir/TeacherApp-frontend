import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;

  constructor(private cc: ControlContainer) {}

  get formGroup() {
    return this.cc.control?.get(this.groupName);
  }

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    let form = this.formGroup;
    if (form) {
      return (
        form.get(formcontrolName)?.hasError(valiador) &&
        form.get(formcontrolName)?.touched
      );
    }
    return false;
  }

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
    address: new FormControl('', [Validators.required]),
    city: new FormControl('Valencia', []),
    province: new FormControl('', []),
  });
}
