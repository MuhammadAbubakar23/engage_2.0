import { TestBed } from '@angular/core/testing';

import { CompaniesJsonResolver } from './companies-json.resolver';

describe('CompaniesJsonResolver', () => {
  let resolver: CompaniesJsonResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesJsonResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
