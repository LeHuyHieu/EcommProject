import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product: ProductService, private route: Router) {}
  ngOnInit(): void {}
  // sellerId: number | undefined;

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
    // if(localStorage.getItem('seller')) {
    //   let localSto = localStorage.getItem('seller');
    //   let sellerData = localSto && JSON.parse(localSto)[0];
    //   console.log(sellerData.id);
    //   this.sellerId = sellerData.id;
    // }

    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product is successfully added';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }

  

}
