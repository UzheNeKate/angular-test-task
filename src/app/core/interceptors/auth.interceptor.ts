import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {TokenService} from '../services/token.service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(TokenService).getToken();

  const authenticatedRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });

  return next(authenticatedRequest);
}
