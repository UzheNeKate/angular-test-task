import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivatePostGuard } from './can-activate-post.guard';

describe('canActivatePostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivatePostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
