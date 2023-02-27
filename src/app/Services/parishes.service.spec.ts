import { TestBed } from '@angular/core/testing';

import { ParishesService } from './parishes.service';

describe('ParishesService', () => {
  let service: ParishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
