import { filter } from 'rxjs';
import { cart, product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productResult: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private route: Router
  ) {}
  ngOnInit(): void {
    let user = localStorage.getItem('user');
      console.log(user);
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productResult = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productResult) {
      this.productResult.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // this.product.localAddToCart(this.productResult);
        let nextPageUserAuth = confirm('Please login to add to cart');
        if(nextPageUserAuth) {
          this.route.navigate(['/user-auth']);
        }
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productResult,
          userId,
          productId: this.productResult.id,
        };
        delete cartData.id;
        this.removeCart = true;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Product added successfully');
          }
        });
      }
    }
  }

  RemoveToCart(productId: number) {
    this.product.removeItemCart(productId);
    this.removeCart = false;
  }
}
