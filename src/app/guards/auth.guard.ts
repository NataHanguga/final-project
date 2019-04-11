import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

  constructor(private auth: LoginService,
              private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
      // // if (this.auth.isLoggedIn) {
        return true;
      // } else {
      //   return this.router.parseUrl('/');
      // }
    }
}
