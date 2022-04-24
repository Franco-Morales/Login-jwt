import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

import { catchError, Observable, switchMap, throwError} from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  private isRefreshing: boolean = false;


  constructor(
    private authSvc: AuthService, private http: HttpClient, 
    private toastSvc: ToastService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent< any > > {
  
    this.authSvc.auth$.subscribe( 
      auth => {
        if(auth?.accessToken) request = this.addTokentoHeader(request, auth?.accessToken);
      }
    );

    return next.handle(request).pipe(
      catchError( error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401 && !this.isRefreshing ) {
            console.log("refreshing on");
            
            return this.handle401Error(request, next);
          }
        }

        this.isRefreshing = false;

        return throwError( () => error );
      })
    )
  }

  private handle401Error (request: HttpRequest<any>, next: HttpHandler) {
    this.isRefreshing = true;

    return this.http.post(`${environment.api}/auth/refresh-token`, {}, { withCredentials: true } ).pipe(
      switchMap( (response: any) => {
        this.authSvc.setAuth(response);
        request = this.addTokentoHeader(request, response.accessToken);
        
        return next.handle(request);
      }),
      catchError( error => {
        this.isRefreshing = false;
        this.toastSvc.toast("Please login again", "error");
        this.authSvc.logout();
        return throwError( () => error );
      })
    );
  }


  private addTokentoHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ 
      setHeaders: {
          authorization: `Bearer ${token}`
      }
    });
  }
}


export const AuthInterceptorProvider: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];