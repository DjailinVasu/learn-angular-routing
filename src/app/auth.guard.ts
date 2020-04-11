import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authServise: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
     return this.authServise.isAuthenticated().then(isAuth => {
       if (isAuth) {
         return true
       } else {
          this.router.navigate(['/'], {
            queryParams: {
              auth: false
            }
          })
       }
     })
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean>  {
      return this.canActivate(route, state)
  }

}
