import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static tokenKey = 'token';

  constructor() { }

  static saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  static getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
