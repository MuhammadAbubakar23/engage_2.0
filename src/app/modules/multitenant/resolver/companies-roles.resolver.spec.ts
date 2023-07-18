import { TestBed } from '@angular/core/testing';

import { CompaniesRolesResolver } from './companies-roles.resolver';

describe('CompaniesRolesResolver', () => {
  let resolver: CompaniesRolesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesRolesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
