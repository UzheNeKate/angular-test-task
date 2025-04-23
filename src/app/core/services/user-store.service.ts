import {Injectable, signal} from '@angular/core';
import {User} from '../models/user';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  user = signal<User | null | undefined>(undefined);
  user$ = toObservable(this.user);
}
