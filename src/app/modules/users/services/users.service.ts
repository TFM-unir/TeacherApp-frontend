import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { UserLogin } from 'src/app/core/models/user-login.interface';
import { UserRegister } from 'src/app/core/models/user-register.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'http://localhost:3000/api/users/';
  private baseUrlRegister: string = 'http://localhost:3000/api/users/register';
  private baseUrlStudents: string = 'http://localhost:3000/api/departments';
  private httpClient = inject(HttpClient);

  Register(user: UserRegister) {
    return lastValueFrom(
      this.httpClient.post<UserRegister>(this.baseUrlRegister, user)
    );
  }

  login(values: UserLogin) {
    return lastValueFrom(
      this.httpClient.post<UserLogin>(`${this.baseUrl}/login`, values)
    );
  }

  getAllStudents() {
    return firstValueFrom(this.httpClient.get(this.baseUrlStudents));
  }
}
