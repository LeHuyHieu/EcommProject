import { product } from './../data-type';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage:undefined | string;
  constructor(private route: ActivatedRoute, private product : ProductService) {}

  ngOnInit(): void {
    //&& kiểm tra toán tử tồn tại và khác null
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    });
  }

  categorysProduct = [
    'Mobile',
    'Labtop',
    'Apple Watch',
    'Watch',
    'Tablet',
    'Desktop',
    'Mouser',
  ]

  submit(data: product) {
    if(this.productData) {
      data.id = this.productData.id;
    }

    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.productMessage = 'Update product success';
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
