import { TestBed } from '@angular/core/testing';
import { UsersJsonResolver } from './users-json.resolver';
describe('UsersJsonResolver', () => {
  let resolver: UsersJsonResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UsersJsonResolver);
  });
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
