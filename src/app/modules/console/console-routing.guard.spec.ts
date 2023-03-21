import { TestBed } from '@angular/core/testing';

import { ConsoleRoutingGuard } from './console-routing.guard';

describe('ConsoleRoutingGuard', () => {
  let guard: ConsoleRoutingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsoleRoutingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
