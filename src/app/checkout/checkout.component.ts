import { Component } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';

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
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.curentCart().subscribe((data) => {
      this.curentData = data;
      this.countProduct = this.curentData.length;
      let price = 0;
      data.forEach((item) => {
        if(item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      console.log(data);
      console.log(this.totalPrice);
    });
  }

  orderNow(data: {email: string, adress:string, phone: number, payments: string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(user && this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }
      this.product.orderNow(orderData).subscribe((result) => {
        if(result) {
          alert('Order successfully')
        }
      })
    }
  }
}
