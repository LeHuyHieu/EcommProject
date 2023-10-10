import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  showForm = true;
  authErr = '';
  constructor(
    private user: UserService, 
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }

  logIn(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authErr = 'Please enter valid details';
      }else {
        // this.localCartToRemoteCart();
        let prevPage: string = '';
        this.router.events.subscribe((event)=> {
          if(event instanceof NavigationStart) {
            prevPage = this.router.url;
            console.log(event);
            console.log(prevPage);
          }
        })
      }
    });
  }

  oppenForm() {
    this.showForm = !this.showForm;
  }

  // localCartToRemoteCart() {
  //   let data = localStorage.getItem('localCart');
  //   if (data) {
  //     let cartDataList: product[] = JSON.parse(data);
  //     let user = localStorage.getItem('user');
  //     console.log(user);
  //     let userId = user && JSON.parse(user).id;
  //     cartDataList.forEach((product: product, index) => {
  //       let cartData: cart = {
  //         ...product,
  //         productId: product.id,
  //         userId,
  //       };
  //       delete cartData.id;
  //       setTimeout(() => {
  //         this.product.addToCart(cartData).subscribe((result) => {
  //           if (result) {
  //             console.log('result', result);
  //           }
  //         });
  //         if (cartDataList.length === index + 1) {
  //           localStorage.removeItem('localCart');
  //         }
  //       }, 500);
  //     });
  //   }
  // }
}
