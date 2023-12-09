import { Component, inject } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css'],
})
export class SearchEngineComponent {
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

  ngOnInit(): void {
    // Obtenemos la lista de usuarios
    this.getPage(this.pagination.currentPage);
  }

  async getPage(page: number) {
    try {
      const response = await this.teacherService.getAllTeachersPagination(
        page,
        this.pagination.per_page
      );
      this.pagination.currentPage = page;
      this.pagination.total_pages = response.total_pages;
      this.pagination.arrPag = new Array(this.pagination.total_pages).fill(0);
      this.myTeachers = response.results;
    } catch (err) {
      console.log(err);
    }
  }
}
