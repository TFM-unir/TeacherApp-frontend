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
import { DepartmentsService } from '../../../../core/services/departments.service';
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

  constructor(
    private departmentsServices: DepartmentsService,
    private cc: ControlContainer
  ) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  async getAllDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentsServices.getAll();
    } catch (error) {
      console.log(error);
    }
  }

  trackByDepartmentId(index: number, department: Department): number {
    return department.id;
  }

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
}

export function generateSubjectFormGroup(): FormGroup {
  return new FormGroup(
    {
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      department_id: new FormControl(0, [Validators.required]),
    },
    []
  );
}
