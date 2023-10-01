import { ProductService } from '../services/product.service';
import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { faShoppingBasket, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  iconCart = faShoppingBasket;
  iconEye = faEye;

  constructor (private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
  }
}
