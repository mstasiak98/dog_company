import { TestBed } from '@angular/core/testing';

import { DogCareService } from './dog-care.service';

describe('DogCareService', () => {
  let service: DogCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
