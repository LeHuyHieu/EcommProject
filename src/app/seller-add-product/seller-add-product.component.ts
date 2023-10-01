import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product: ProductService, private http: HttpClient) {}
  ngOnInit(): void {}

  categorysProduct = [
    'Mobile',
    'Labtop',
    'Apple Watch',
    'Watch',
    'Tablet',
    'Desktop',
    'Mouser',
  ];

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is successfully added';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }

  // onImageUpload(event: any) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     this.product.uploadImage(file).subscribe(response => {
  //       console.log('Hình ảnh đã được tải lên:', response);
  //     }, error => {
  //       console.error('Lỗi khi tải lên hình ảnh:', error);
  //     });
  //   }
  // }

}
