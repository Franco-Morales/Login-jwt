import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private subscription: Subscription;
  private urlHistory: string[] = [];  

  
  constructor(private router: Router, private location: Location) { 
    this.subscription = this.router.events.subscribe( (event) => {
      (event instanceof NavigationEnd) && this.urlHistory.push(event.urlAfterRedirects);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public back(): void {
    this.urlHistory.pop();
    this.urlHistory.length? this.location.back() : this.router.navigateByUrl('/');
  }
}
// Based on https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
