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
  cartData: product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private route: Router
  ) {}
  ngOnInit(): void {
    let user = localStorage.getItem('user');
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
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
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
        if (nextPageUserAuth) {
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
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Product added successfully');
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemCart(productId);
      this.removeCart = false;
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      let removeItemCart = confirm('Are you sure you want to remove');
      if (removeItemCart) {
        this.cartData &&
          this.product.removeToCart(this.cartData.id).subscribe((result) => {
            if (result) {
              this.product.getCartList(userId);
              this.removeCart = false;
            }
          });
      }
    }
  }
}
