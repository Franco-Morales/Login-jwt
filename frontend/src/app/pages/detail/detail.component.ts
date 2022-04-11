import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public product: Product;
  public isLoading: Boolean = true;

  private subscription: Subscription;


  constructor(private productSvc: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let prodId = this.route.snapshot.paramMap.get("id") || "";

    this.subscription = this.productSvc.getOneProduct(prodId)
    .subscribe( resp => {
      this.product = resp.data;
      this.isLoading = !this.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
