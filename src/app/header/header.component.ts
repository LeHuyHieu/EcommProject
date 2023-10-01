import { Component, OnInit } from '@angular/core';
import { SellService } from '../services/sell.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType : string = 'default';
  sellerName : string = '';
  constructor(private route: Router, private seller: SellService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if(localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else {
          this.menuType = 'default';
        }
      }
    })
  }
  logout() {
    this.seller.logout();
  }
}
