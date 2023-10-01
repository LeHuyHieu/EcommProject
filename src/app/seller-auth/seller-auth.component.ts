import { Component, OnInit } from '@angular/core';
import { SellService } from '../services/sell.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellService, private router: Router) {}
  ngOnInit(): void {
    this.seller.reloadSellder();
  }

  showLogin = false;
  authError:string = '';
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
  
  //sign up
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  //login
  login(data: SignUp): void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = 'Email or password is not correct';
      }
    })
  }

}
