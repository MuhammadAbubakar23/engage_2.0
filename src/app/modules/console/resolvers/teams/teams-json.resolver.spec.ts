import { TestBed } from '@angular/core/testing';

import { TeamsJsonResolver } from './teams-json.resolver';

describe('TeamsJsonResolver', () => {
  let resolver: TeamsJsonResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TeamsJsonResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
