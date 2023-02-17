import { TestBed } from '@angular/core/testing';

import { AsyncronousValidatorService } from './asyncronous-validator.service';

describe('AsyncronousValidatorService', () => {
  let service: AsyncronousValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncronousValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
