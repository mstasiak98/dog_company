import { TestBed } from '@angular/core/testing';

import { AccountDataGuard } from './account-data.guard';

describe('AccountDataGuard', () => {
  let guard: AccountDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
