import { TestBed } from '@angular/core/testing';
import { MultitenantGuard } from './multitenant.guard';
describe('MultitenantGuard', () => {
  let guard: MultitenantGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MultitenantGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
