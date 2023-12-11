import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.interface';

export const studentGuard: CanActivateFn = (route, state) => {

  const coreService = inject(AuthService);
  const router = inject(Router);
  const role = coreService.getUserRole();

  //role student o admin
  if(role === 1 || role === 3){
    return true;
  }

  router.navigate(['/home']);
  return false;
};
