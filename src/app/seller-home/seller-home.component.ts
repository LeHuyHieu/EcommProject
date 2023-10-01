import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined|string;
  constructor(private product: ProductService) {}
  
  ngOnInit(): void {
    this.list();  
  }

  deleteProduct(id: number) {
    console.log(id);
    const agreeDelete = confirm('Are you sure you want to delete');
    if(agreeDelete) {
      this.product.deleteProduct(id).subscribe((result)=>{
        if(result) {
          this.productMessage = 'Product deleted successfully';
          this.list();
        }
      })
    }else {
      return;
    }

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.listProduct().subscribe((result)=>{
      if(result) {
        this.productList = result;
      }
    })
  }
}
