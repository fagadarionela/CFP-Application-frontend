import { Injectable } from '@angular/core';
// import {LARAVEL_SERVER_URL} from '../../../utils/http-utils.constant';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  //
  // private tokenIssuer = {
  //   login: LARAVEL_SERVER_URL + '/api/auth/signin',
  //   register: LARAVEL_SERVER_URL + '/api/auth/signup'
  // };
  //
  // constructor() { }
  //
  // setTokenStorage(token): void{
  //   sessionStorage.setItem('auth_token', token);
  // }
  //
  // getJwtToken(): any{
  //   return sessionStorage.getItem('auth_token');
  // }
  //
  // validateToken(): any{
  //   const token = this.getJwtToken();
  //
  //   if (token){
  //     const payload = this.payload(token);
  //     if (payload){
  //       return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1 ? true : false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
  //
  // payload(token): any{
  //   const jwtPayload = token.split('.')[1];
  //   return JSON.parse(atob(jwtPayload));
  // }
  //
  // // User state
  // isSignedin(): any{
  //   return this.validateToken();
  // }
  //
  // // Destroy token
  // destroyToken(): any{
  //   localStorage.removeItem('auth_token');
  // }
}
