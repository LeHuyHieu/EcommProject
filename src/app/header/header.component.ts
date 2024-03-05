import { Component, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { SellService } from '../services/sell.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  showMenuSearch: boolean = false;
  userName: string = '';
  cartItem = 0;
  show = false;

  iconClose = faTimes;
  constructor(
    private route: Router,
    private product: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else if(localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }

    let user = localStorage.getItem('user');
    if(user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.product.cartData.subscribe((items) => {
        this.cartItem = items.length;
      });
    }
  }

  logoutSell() {
    localStorage.removeItem('seller');
    this.isSellerLoggedIn.next(false);
    this.route.navigate(['/']);
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.isSellerLoggedIn.next(false);
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
        if (result.length === 0) {
          this.searchResult = undefined;
        }
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  dropdown() {
    this.show = !this.show;
  }

  submitSearch(val: string) {
    if(val !== '') {
      this.route.navigate([`search/${val}`]);
    }
  }

  redirectToDetail(id: number) {
    this.route.navigate([`/details/${id}`]);
  }
}
