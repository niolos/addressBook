import { TestBed } from '@angular/core/testing';

import { KeepoutGuard } from './keepout.guard';

describe('KeepoutGuard', () => {
  let guard: KeepoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeepoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
