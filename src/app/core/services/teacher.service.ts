import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { find, firstValueFrom, lastValueFrom } from 'rxjs';
import { ClassHour } from 'src/app/core/models/class.interface';
import { Ratings } from 'src/app/core/models/ratings.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  // Tenemos que hacer peticiones sobre nuestra api
  private baseUrl: string = 'http://localhost:3000/api/teachers/';
  private basePaginationUrl: string =
    'http://localhost:3000/api/teachers/pagination/';
  private httpClient = inject(HttpClient);
  private ratingPromBaseUrl: string =
    'http://localhost:3000/api/ratings/prom/teacher/';
  private classBaseUrl: string = 'http://localhost:3000/api/class/teacher/';
  private ratingBaseUrl: string = 'http://localhost:3000/api/ratings/teacher/';
  private putClassBaseUrl: string =
    'http://localhost:3000/api/class/updateByStudentIdAndClassId/';
  private deleteClassBaseUrl: string = 'http://localhost:3000/api/class/withdrawClassSlot/';

  getAllTeachers() {
    return lastValueFrom(
      this.httpClient.get<TeacherProfile[]>(this.baseUrl));
  }
  
  getAllTeachersPagination(page: number, per_page: number) {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.basePaginationUrl}${page}/${per_page}`)
    );
  }

  getTeacherById(id: number) {
    return firstValueFrom(
      this.httpClient.get<TeacherProfile>(`${this.baseUrl}${id}`)
    );
  }

  getTeacherByIdAllData(id: number) {
    return firstValueFrom(
      this.httpClient.get<TeacherProfile>(`${this.baseUrl}all/${id}`)
    );
  }

  getAverageRatingByTeacherId(id: number) {
    return firstValueFrom(
      this.httpClient.get<number>(`${this.ratingPromBaseUrl}${id}`)
    );
  }

  getAllClassByTeacherId(id: number) {
    //metemos la cabecera
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('auth_token')!,
      }),
    };
    //Ahora como segundo parametro del get le pasamos ese objeto
    return firstValueFrom(
      this.httpClient.get<ClassHour>(`${this.classBaseUrl}${id}`, httpOptions)
    );
  }

  //Hacemos lo de recuperar los rating por id de teacher
  getRatingsByTeacherId(id: number) {
    return lastValueFrom(
      this.httpClient.get<Ratings[]>(`${this.ratingBaseUrl}${id}`)
    );
  }

  deleteUser(id: number) {
    throw new Error('Method not implemented.');
  }

  updateTeacher(obj:any, teacherId:number){
    return lastValueFrom(
      this.httpClient.put<TeacherProfile>(`${this.baseUrl}${teacherId}`,obj)
    );
  }

  UpdateClassByStudentIdAndClassId(id: number, slot: ClassHour, emptySlot: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('auth_token')!,
      })
    };
    if (emptySlot) {
      slot.empty_slot = emptySlot;
    }
    return lastValueFrom(
      this.httpClient.put<ClassHour>(`${this.putClassBaseUrl}${id}`, slot, httpOptions)
    );
  };

  unenrollClass(id: number, slot: ClassHour) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('auth_token')!,
      })
    };
    return lastValueFrom(
      this.httpClient.put<any>(`${this.deleteClassBaseUrl}${id}/${slot.id}`, slot, httpOptions)
    );
  }
};
