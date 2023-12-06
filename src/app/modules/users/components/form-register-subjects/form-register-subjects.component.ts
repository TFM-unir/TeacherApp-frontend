import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from 'src/app/core/models/department.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-register-subjects',
  templateUrl: './form-register-subjects.component.html',
  styleUrls: ['./form-register-subjects.component.css'],
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
export class FormRegisterSubjectsComponent implements OnInit {
  @Input() groupName = '';

  // lista de departments
  departments: Department[] | undefined;

  // asincrono, peticiones a una API
  httpClient = inject(HttpClient);

  constructor(private departmentsServices: DepartmentsService) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  async getAllDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentsServices.getAll().toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}

export function generateSubjectFormGroup(): FormGroup {
  return new FormGroup(
    {
      subject: new FormControl('tkkkgg', [
        Validators.required,
        Validators.minLength(3),
      ]),
      department_id: new FormControl(0, [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    []
  );
}
