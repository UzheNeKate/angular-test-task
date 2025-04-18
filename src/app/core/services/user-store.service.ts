import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  //user$: Observable<User> = null;
  user = signal<User | null>(null);

  constructor() { }
}
