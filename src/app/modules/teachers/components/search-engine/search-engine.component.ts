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

  pagination: Pagination = { page: 0, per_page: 0, total: 0, total_pages: 0 };

  // lista de usuarios
  myTeachers: TeacherProfile[] = [];

  ngOnInit(): void {
    // Obtenemos la lista de usuarios
    this.getAllTeachers();

    //this.pagination = this.teacherService.getPagination();
  }

  async getAllTeachers(): Promise<void> {
    try {
      this.myTeachers = await this.teacherService.getAllTeachers();
    } catch (error) {
      console.log(error);
    }
  }
}
