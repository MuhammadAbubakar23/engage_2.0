import { TestBed } from '@angular/core/testing';
import { ResponderGuardGuard } from './responder-guard.guard';
describe('ResponderGuardGuard', () => {
  let guard: ResponderGuardGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResponderGuardGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
