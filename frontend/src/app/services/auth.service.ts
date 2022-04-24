import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Auth } from '../models/auth.interface';
import { User } from '../models/user.interface';
import { helper } from "./auth.helper";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<Auth | null>(null);


  constructor( private http: HttpClient, private router: Router ) { }


  public signUp(email: string, password: string, username: string): Observable<User> {
    return this.http.post<User>(`${environment.api}/auth/signup`, { email, password, username })
    .pipe(
      map(resp => {
        this.setAuth(resp);
        return resp;
      })
    );
  }

  public loggIn(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.api}/auth/loggin`, { email, password },{ withCredentials: true })
    .pipe(
      map( resp => {
        this.setAuth(resp)
        return resp
      })
    );
  }

  public logout(): void {
    this.http.post<any>(`${environment.api}/auth/logout`,{ }, { withCredentials: true })
    .subscribe(
      resp => {
        this.setAuth();
        this.router.navigate(["loggin"]);
      }
    );
  }

  public setAuth(authObj: any = null): void {
    this.authSubject.next(authObj);
  }
  
  public checkToken(token: string): boolean{
    return helper.isTokenExpired(token)
  }

  public get auth$(): Observable<Auth | null> {
    return this.authSubject.asObservable();
  }
}