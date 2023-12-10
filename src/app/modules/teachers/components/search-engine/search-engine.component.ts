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
    this.filterForm = new FormGroup({ selectedDepartment: new FormControl() });
    // Obtenemos la lista de usuarios
    this.getAllTeachers();

    // obtenemos la lista de departments
    this.getAllDepartments();
  }

  ngOnInit(): void {
    // Delay for 0.2 seconds
    setTimeout(() => {
      // Code to be executed after the delay
      this.aplicarFiltro();
    }, 200);
  }

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

  async getPage(page: number) {
    try {
      this.pagination.currentPage = page;

      // Update the filtered teachers based on the current page and items per page
      const startIndex =
        (this.pagination.currentPage - 1) * this.pagination.per_page;
      const endIndex = startIndex + this.pagination.per_page;
      this.showMyteachers = this.filteredMyteachers.slice(startIndex, endIndex);

      this.pagination.total_pages = Math.ceil(
        this.filteredMyteachers.length / this.pagination.per_page
      );
      this.pagination.arrPag = new Array(this.pagination.total_pages).fill(0);
    } catch (err) {
      console.log(err);
    }
  }

  async aplicarFiltro() {
    let selectedDepartment = this.filterForm.value.selectedDepartment;
    if (!selectedDepartment) selectedDepartment = '';

    this.filteredMyteachers = this.myTeachers.filter(
      (teacher) =>
        selectedDepartment === '' ||
        teacher.department_name === selectedDepartment
    );
    this.pagination.currentPage = 1;
    this.getPage(this.pagination.currentPage);
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
}
