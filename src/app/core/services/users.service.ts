import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserLogin } from 'src/app/core/models/user-login.interface';
import { UserRegister } from 'src/app/core/models/user-register.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'http://localhost:3000/api/users/';

  private httpClient = inject(HttpClient);

  getAllUsers() {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl));
  }

  register(user: UserRegister) {
    return lastValueFrom(
      this.httpClient.post<UserRegister>(`${this.baseUrl}/register`, user)
    );
  }

  login(values: UserLogin) {
    return lastValueFrom(
      this.httpClient.post<UserLogin>(`${this.baseUrl}/login`, values)
    );
  }

  updateUserStatus(id: number, status: number) {
    const obj = { id, status };
    return lastValueFrom(
      this.httpClient.put<User>(`${this.baseUrl}status`, obj)
    );
  }
}
