import { TestBed } from '@angular/core/testing';

import { JoinGroupResolver } from './join-group.resolver';

describe('JoinGroupResolver', () => {
  let resolver: JoinGroupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JoinGroupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
