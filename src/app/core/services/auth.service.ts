import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { tokenPayload } from '../models/tokenPayload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  };

  // Descodificar el token
  getDecodedToken(): tokenPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken as tokenPayload;
      } catch (error) {
        console.error('Error decoding token:', error);
      };
    };
    return null;
  };

  // Obtener el role del token
  getUserRole(): number | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.user_role : null;
  };

  // Escribir a string el tipo de role para usar en estilos
  getUserRoleName(): string | null {
    const decodedUserRole = this.getUserRole();
    if (decodedUserRole === 1) return 'student';
    if (decodedUserRole === 2) return 'teacher';
    if (decodedUserRole === 3) return 'admin';
    return null;
  };

  getUserRoleForStyles(): string {
    const decodedUserRole = this.getUserRole();
    if (decodedUserRole === 1) return 'student';
    if (decodedUserRole === 2) return 'teacher';
    if (decodedUserRole === 3) return 'admin';
    return 'student';
  };

  // Obtener el id del token
  getUserId(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.user_id.toString() : null;
  };

  getUserName(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.user_name : null;
  }
}