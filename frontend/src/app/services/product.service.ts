import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../models/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  public getAllProducts(): Observable<any> {
    return this.http.get<any[]>(`${environment.api}/products`, { withCredentials: true });
  }


  public getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api}/products/${id}`, { withCredentials: true });
  }
}
