import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CheckGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.auth$.pipe(
      take(1),
      map( auth => {
        if(auth?.accessToken) {
          return true;
        } else {
          this.router.navigate(['/loggin']);
          return false;
        }
      })
    );
  }
}