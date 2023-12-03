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
  private httpClient = inject(HttpClient);

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
}
