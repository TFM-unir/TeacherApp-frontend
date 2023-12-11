import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if(localStorage.getItem('auth_token')){
    //comprobar que el token existe
    return true;
  } 
  //No está loguedo redirigimos al login
  router.navigate(['/users', 'login'])
  return false;
};
