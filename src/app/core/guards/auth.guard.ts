import { CanActivateChildFn, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('auth_token')){

    //comprobar que el token es válido
    return true;
  } 

  return false;
};
