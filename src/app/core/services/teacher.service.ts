import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Ratings } from 'src/app/core/models/ratings.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  // Tenemos que hacer peticiones sobre nuestra api
  private baseUrl: string = 'http://localhost:3000/api/teachers/'; //ojo falta teacher ID
  private httpClient = inject(HttpClient);
  private ratingBaseUrl: string =
    'http://localhost:3000/api/ratings/prom/teacher/';

  getAll() {
    return lastValueFrom(this.httpClient.get<TeacherProfile[]>(this.baseUrl));
  }

  getTeacherById(id: number) {
    return firstValueFrom(
      this.httpClient.get<TeacherProfile>(`${this.baseUrl}${id}`)
    );
  }

  getAverageRatingByTeacherId(id: number) {
    return firstValueFrom(
      this.httpClient.get<number>(`${this.ratingBaseUrl}${id}`)
    );
  }

  deleteUser(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor() {}
}
