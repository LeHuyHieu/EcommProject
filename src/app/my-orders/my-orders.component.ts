import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
  }

  getOrderList() {
    this.product.listOrder().subscribe((result) => {
      this.orderData = result;
    })
  }
}
