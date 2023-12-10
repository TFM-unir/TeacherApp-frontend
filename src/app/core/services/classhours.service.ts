import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasshoursService {
  
  private httpClient = inject(HttpClient);
  
  constructor() { }

  private baseUrl: string = 'http://localhost:3000/api/class/';

  getAllUsersByTeacherId(teacherId:number){
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}teacher/${teacherId}`)
    );
  }

}
