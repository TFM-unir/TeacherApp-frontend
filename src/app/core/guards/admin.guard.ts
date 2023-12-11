import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const coreService = inject(AuthService);
  const router = inject(Router);
  const role = coreService.getUserRole();

  //role student o admin
  if(role === 3){
    return true;
  }

  router.navigate(['/home']);
  return false;

  return true;
};
