import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellService } from './services/sell.service';

@Injectable({
  providedIn: 'root'
}) 
/*
Injectable là decorator 
providedIn: 'root' điều này đảm bảo rằng chỉ có một file auth.guard.ts
*/


export class AuthGuard implements CanActivate {
  /*file này là để kiểm tra xem người dùng có quyền truy cập vào trang hay không
  Guards trong angular được sử dụng để bảo về router và kiểm tra trước khi cho người dùng điều hướng trang
  
  */
  constructor(private sellerService:SellService){}//sellerService được sử dụng để inject vào contructor của AuthGuard 
  //cho phép kiểm tra trạng thái đăng nhập seller

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
      if(localStorage.getItem('seller')){
        return true;
        //trả về true thì người dùng mới truy cập được
      }
    return this.sellerService.isSellerLoggedIn;
    // kiểm tra xem người dùng đã đăng nhập với vai trò nào dựa trên SellService
  }
  /*
  Hàm canActivate() được gọi mỗi khi người dùng điều hướng trang tới một router mà AuthGuard được gán
  route: ActivatedRouteSnapshot: đại diện cho thông tin route mà người dùng cố gắng truy cập
  state: RouterStateSnapshot: đại diện trạng thái hiện tại của route
  */
};
