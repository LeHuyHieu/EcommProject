import { EventEmitter, Injectable } from '@angular/core';
//import thư viện http của angular
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs'; //theo dõi trạng thái đăng nhập
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        // this.router.navigate(['seller-home']);
      });
      this.http.get(
        `http://localhost:3000/seller?password=${data.password}&email=${data.email}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body && Object.keys(result.body).length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }

  reloadSellder() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/seller?password=${data.password}&email=${data.email}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body && Object.keys(result.body).length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
