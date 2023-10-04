import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productResult: undefined | product;
  productQuantity: number = 1;
  constructor(private activeRoute: ActivatedRoute, private product : ProductService){}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productResult = result;
      console.log(this.productResult);
    });
  }

  handleQuantity(val: string) {
    if(this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }else if(this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
}
