import { TestBed } from '@angular/core/testing';

import { ModulesResolver } from './modules.resolver';

describe('ModulesResolver', () => {
  let resolver: ModulesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModulesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
