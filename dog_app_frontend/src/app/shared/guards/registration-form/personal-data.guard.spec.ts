import { TestBed } from '@angular/core/testing';

import { PersonalDataGuard } from './personal-data.guard';

describe('PersonalDataGuard', () => {
  let guard: PersonalDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonalDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
