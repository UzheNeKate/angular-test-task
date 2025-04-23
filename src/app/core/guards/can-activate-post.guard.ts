import { CanActivateFn } from '@angular/router';
import {UserStoreService} from '../services/user-store.service';
import {inject} from '@angular/core';

export const canActivatePostGuard: CanActivateFn = (route, state) => {
  let userStore = inject(UserStoreService);

  return userStore.user() != null;
};
