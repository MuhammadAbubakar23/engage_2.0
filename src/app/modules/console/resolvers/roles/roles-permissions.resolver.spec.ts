import { TestBed } from '@angular/core/testing';

import { RolesPermissionsResolver } from './roles-permissions.resolver';

describe('RolesPermissionsResolver', () => {
  let resolver: RolesPermissionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RolesPermissionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
