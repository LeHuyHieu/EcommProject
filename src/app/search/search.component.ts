import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { faShoppingBasket, faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { filter } from 'rxjs';

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
  queryUrl: string | null = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.resultData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resultData();
      });
  }

  resultData() {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query &&
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResults = result;
        if (result.length === 0) {
          this.querySearch = 'Không có sản phẩm nào liên quan đến: ' + query;
        } else {
          this.querySearch = 'Tất cả sản phẩm về: ' + query;
        }
      });
  }
}
