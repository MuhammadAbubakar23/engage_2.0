import { TestBed } from '@angular/core/testing';

import { RolesResolver } from './roles.resolver';

describe('RolesResolver', () => {
  let resolver: RolesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RolesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
