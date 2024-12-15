import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderConfirmGuard } from './order-confirm.guard';

describe('orderConfirmGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderConfirmGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
