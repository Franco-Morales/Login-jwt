import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private isLoggin: boolean = false;
  private subscription: Subscription;
  private username: string = "";


  constructor(private authSvc: AuthService, private toastSvc: ToastService) { }

  ngOnInit(): void { 
    this.subscription = this.authSvc.auth$.subscribe( auth => {
      if(auth) {
        this.isLoggin = true;
        this.username = auth.username;
      } else {
        this.isLoggin = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public onLogout(e: Event): void {
    e.preventDefault();
    this.toastSvc.toast("Good Bye !", "success")
    this.authSvc.logout();
  }


  public get loggin(): boolean {
    return this.isLoggin;
  }
  public get getUsername(): string {
    return this.username;
  }
}
