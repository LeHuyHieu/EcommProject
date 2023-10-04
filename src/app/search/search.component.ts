import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faShoppingBasket, faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  iconCart = faShoppingBasket;
  iconEye = faEye;
  querySearch: string | null = '';
  searchResults: undefined | product[];

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
  ) {}

  ngOnInit(): void {
    this.resultData();
  }

  resultData() {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) => {
        this.searchResults = result;
        if(result.length === 0){
          this.querySearch = 'There are no products related to the ' + query;
        }else {
          this.querySearch = 'All products about ' + query;
        }
    });
  }

  
}
