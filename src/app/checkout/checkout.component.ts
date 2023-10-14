import { Component } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cash = faCreditCard;
  totalPrice: number | undefined;
  curentData: cart[] | undefined;
  countProduct: number = 0;
  orderMessage: string | undefined;
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.curentCart().subscribe((data) => {
      this.curentData = data;
      if(this.curentData.length > 0) {
        this.countProduct = this.curentData.length;
        let price = 0;
        data.forEach((item) => {
          if(item.quantity) {
            price = price + (+item.price * item.quantity);
          }
        });
        this.totalPrice = price + price / 10 + 100 - price / 10;
      }else {
        this.router.navigate(['/']);
      }
    });
  }

  orderNow(data: {email: string, adress:string, phone: number, payments: string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(user && this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      
      this.curentData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deteleCartItems(item.id)
        }, 600);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if(result) {
          this.orderMessage = 'Your order has been placed successfully';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMessage = undefined;
          }, 3000);
        }
      })
    }
  }
}
