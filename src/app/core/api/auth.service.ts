import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {User} from '../models/user';
import {TokenService} from '../services/token.service';
import {UserStoreService} from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private userStore = inject(UserStoreService);

  constructor() { }

  login(): Subscription {
    return this.httpClient.get<User>(`${this.baseUrl}/1`)
      .subscribe(user => {
        this.userStore.user.set(user);
        this.tokenService.saveToken(this.generateRandomString());
      });
  }

  generateRandomString(length: number = 15): string {
    return Math.random().toString(20).substring(2, length);
  }
}
