import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: any;
  searchResults: any;
  querySearch: string | undefined;
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient, private activeRoute: ActivatedRoute,) {}

  addProduct(data: product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post('http://localhost:3000/products', data, httpOptions);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post('http://localhost:3000/api/upload', formData);
  }

  listProduct() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5')
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8')
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart){
    return this.http.post('http://localhost:3000/cart', cartData);
  }

}
