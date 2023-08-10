import { TestBed } from '@angular/core/testing';

import { ConsoleResolver } from './console.resolver';

describe('ConsoleResolver', () => {
  let resolver: ConsoleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ConsoleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
