import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private baseUrl: string = 'http://localhost:3000/api/departments/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.baseUrl);
  }
}
