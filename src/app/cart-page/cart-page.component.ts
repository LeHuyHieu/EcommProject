import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  curentCartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.product.curentCart().subscribe((data) => {
      this.curentCartData = data;
      let price = 0;
      data.forEach((item) => {
        if(item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
    });
  }

  removeItem(cartId: number) {
    let deleteItem = confirm('Are you sure you want to delete');
    if (deleteItem) {
      this.product.removeToCart(cartId);
    }
  }

  checkout() {
    this.route.navigate(['/checkout']);
  }
}
