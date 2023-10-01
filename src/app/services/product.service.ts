import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

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
}
