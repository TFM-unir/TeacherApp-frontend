import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/core/models/department.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
})
export class SearchEngineComponent {
  // lista de departments
  departments: Department[] | undefined;

  //inyectamos el servicio
  teacherService = inject(TeacherService);

  pagination: Pagination = {
    page: 0,
    per_page: 3,
    currentPage: 1,
    total_pages: 0,
    arrPag: [],
  };

  // lista de usuarios
  myTeachers: TeacherProfile[] = [];

  filteredMyteachers: TeacherProfile[] = [];

  showMyteachers: TeacherProfile[] = [];

  filterForm: FormGroup;

  constructor(private departmentsServices: DepartmentsService) {
    this.filterForm = new FormGroup({
      selectedDepartment: new FormControl(),
      ordenarPor: new FormControl(),
      filtroPuntuacion: new FormControl(),
      filtroPrecio: new FormControl(),
      filtroExperiencia: new FormControl(),
    });

    // Obtenemos la lista de usuarios
    this.getAllTeachers();

    // obtenemos la lista de departments
    this.getAllDepartments();
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * It sets a timeout of 200 milliseconds before calling the aplicarFiltro method to allow time for the component to initialize before applying the filter.
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.aplicarFiltro();
    }, 200);
  }

  /**
   * Asynchronously fetches all teachers using the teacherService and populates the myTeachers, filteredMyteachers, and showMyteachers arrays.
   */
  async getAllTeachers() {
    try {
      const response = await this.teacherService.getAllTeachers();
      this.myTeachers = response;
      this.filteredMyteachers = this.myTeachers;
      this.showMyteachers = this.myTeachers;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Asynchronously calculates the pagination parameters and updates the showMyteachers array based on the current page.
   */
  async getPage(page: number) {
    try {
      // asignamos la pagina actual
      this.pagination.currentPage = page;

      // calculamos el start and end index
      const startIndex =
        (this.pagination.currentPage - 1) * this.pagination.per_page;
      const endIndex = startIndex + this.pagination.per_page;

      // seleccionamos los profesores a mostrar
      this.showMyteachers = this.filteredMyteachers.slice(startIndex, endIndex);

      // calculamos los datos de paginacion.
      this.pagination.total_pages = Math.ceil(
        this.filteredMyteachers.length / this.pagination.per_page
      );
      this.pagination.arrPag = new Array(this.pagination.total_pages).fill(0);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Asynchronously applies the selected department filter to the filteredMyteachers array and updates the pagination.
   */
  async aplicarFiltro() {
    console.log(this.filterForm.value);

    let selectedDepartment = this.filterForm.value.selectedDepartment;
    if (!selectedDepartment) selectedDepartment = '';

    let filtroPrecio = this.filterForm.value.filtroPrecio;
    if (!filtroPrecio) filtroPrecio = '';

    let filtroPuntuacion = this.filterForm.value.filtroPuntuacion;
    if (!filtroPuntuacion) filtroPuntuacion = '';

    let filtroExperiencia = this.filterForm.value.filtroExperiencia;
    if (!filtroExperiencia) filtroExperiencia = '';

    console.log(filtroPrecio);
    this.filteredMyteachers = this.myTeachers.filter(
      (teacher) =>
        (selectedDepartment === '' ||
          teacher.department_name === selectedDepartment) &&
        (filtroPuntuacion === '' || teacher.rating === filtroPuntuacion) &&
        (filtroPrecio === '' ||
          (teacher.price_hour > 0 && teacher.price_hour <= filtroPrecio)) &&
        (filtroExperiencia === '' || teacher.experience === filtroExperiencia)
    );

    // Ordenar los profesores
    let ordenar = this.filterForm.value.ordenarPor;
    if (ordenar === 'experiencia')
      this.filteredMyteachers.sort((a, b) => a.experience - b.experience);
    if (ordenar === 'precio')
      this.filteredMyteachers.sort((a, b) => a.price_hour - b.price_hour);
    if (ordenar === 'distancia')
      this.filteredMyteachers.sort((a, b) => a.distance - b.distance);

    this.pagination.currentPage = 1;
    this.getPage(this.pagination.currentPage);
  }

  /**
   * Asynchronously fetches all departments using the departmentsServices and populates the departments array.
   */
  async getAllDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentsServices.getAll();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Method used for tracking the departments in the ngFor loop.
   */
  trackByDepartmentId(index: number, department: Department): number {
    return department.id;
  }
}
