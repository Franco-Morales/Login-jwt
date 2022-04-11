import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { catchError, Observable, Subscription, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authSvc: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent< any > > {
  
    let subscription: Subscription = this.authSvc.auth$.subscribe( 
      auth => {
        if(auth?.accessToken && !this.authSvc.checkToken(auth.accessToken)) {
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${auth.accessToken}`
            }
          });
        }
      }
    );

    subscription.unsubscribe();

    // return next.handle(request).pipe(
    //   catchError( err => {
    //     console.log("error token =>",err);
    //     if ([403,401].includes(err.status)) {
    //       this.toastSvc.toast("Please loggin again", "info");
    //       this.authSvc.logout();
    //     }
    //     let error = new Error(err.message)
    //     return throwError( () => error );
    //   })
    // );
    return next.handle(request);
  }
}
