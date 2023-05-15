import { TestBed } from '@angular/core/testing';

import { TeamsPermissionsResolver } from './teams-permissions.resolver';

describe('TeamsPermissionsResolver', () => {
  let resolver: TeamsPermissionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TeamsPermissionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
