import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private toastSvc: ToastService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError( (error: HttpErrorResponse) => {

        if(error.status === 403) {
          this.toastSvc.toast("Please loggin again", "info");
          this.authSvc.logout();
        }
        if(error.status === 404) {
          this.router.navigate(["error"])
        }

        this.toastSvc.toast("Unexpected error !", "error");
        return throwError( () =>  error);
      })
    );
  }
}
