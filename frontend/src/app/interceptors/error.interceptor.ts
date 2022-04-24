import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, Observable, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private router: Router, private toastSvc: ToastService ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError( (error: HttpErrorResponse) => {
        if(error.status === 404) {
          this.router.navigate(["error"])
        }

        this.toastSvc.toast("Something unexpected happened","error");

        return throwError( () =>  error);
      })
    );
  }
}


export const ErrorInterceptorProvider: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
]