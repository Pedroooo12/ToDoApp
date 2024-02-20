import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

    const checkAuthStatus = (): boolean | Observable<boolean> => {
        //se inyectan el AuthService y el Router
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
       
        return authService.checkAuthentication().pipe(
          tap((isAuthenticated) => {
            if (!isAuthenticated) {
              router.navigate(['/login']);
            }
          })
        );
      };
       
      //Indica si el usuario tiene permisos o no
      export const canActivateGuard: CanActivateFn = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) => {
       
        return checkAuthStatus();
      };
       
      //Protege que no pueda cargar los componentes ya que esta en forma perezosa
      export const canMatchGuard: CanMatchFn = (
        //Tipado CanMatchFN
        route: Route,
        segments: UrlSegment[]
      ) => {

       
        return checkAuthStatus();
      };