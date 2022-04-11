import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public username: string;
  public isLoading: Boolean = true;

  private subsProd: Subscription;
  private subsAuth: Subscription;


  constructor(private productSvc: ProductService, private authSvc:AuthService) { }

  ngOnInit(): void {
    this.subsProd = this.productSvc.getAllProducts()
    .subscribe( resp => {
      this.products = resp.data;
      this.isLoading = !this.isLoading;
    })

    this.subsAuth = this.authSvc.auth$.subscribe( auth => {
      this.username = auth?.username || "";
    });
  }

  ngOnDestroy(): void {
    this.subsAuth.unsubscribe();
    this.subsProd.unsubscribe();
  }
}