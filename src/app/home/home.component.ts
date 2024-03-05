import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product, cart } from './../data-type';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faShoppingBasket, faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  showNavigationArrows = false;
  showNavigationIndicators = false;
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  removeCart = false;
  productQuantity: number = 1;

  iconCart = faShoppingBasket;
  iconEye = faEye;

  constructor (private product: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
  }

  AddToCart(item: any) {
    if (item) {
      item.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        let nextPageUserAuth = confirm('Please login to add to cart');
        if (nextPageUserAuth) {
          this.route.navigate(['/user-auth']);
        }
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...item,
          userId,
          productId: item.id,
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
}
