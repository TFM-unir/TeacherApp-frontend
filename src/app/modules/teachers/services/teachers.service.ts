import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TeacherProfile }  from '../../../core/models/teacher.interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string = 'http://localhost:3000/api/teachers/';

  constructor(private httpClient: HttpClient) {}

  getAllTeachers(): Promise<TeacherProfile[]> {
    return lastValueFrom(this.httpClient.get<TeacherProfile[]>(this.baseUrl));
  }
}




