import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrlRegister: string = 'http://localhost:3000/api/users/register';
  private baseUrlStudents: string = 'http://localhost:3000/api/departments';
  private httpClient = inject(HttpClient);

  Register(user: string) {
    return lastValueFrom(this.httpClient.post(this.baseUrlRegister, user));
  }

  getAllStudents() {
    return firstValueFrom(this.httpClient.get(this.baseUrlStudents));
  }
}
