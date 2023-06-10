import { TestBed } from '@angular/core/testing';

import { CompaniesResolver } from './companies.resolver';

describe('CompaniesResolver', () => {
  let resolver: CompaniesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
