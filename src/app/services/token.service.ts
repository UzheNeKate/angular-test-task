import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static tokenKey = 'token';
  constructor() { }

  static saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  static getToken() {
    return this.tokenKey;
  }

  static removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
