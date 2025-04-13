import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {TokenService} from '../../services/token.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const authToken = TokenService.getToken();

  const authenticatedRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });

  return next(authenticatedRequest);
}
