import { TestBed } from '@angular/core/testing';

import { TagsResolver } from './tags.resolver';

describe('TagsResolver', () => {
  let resolver: TagsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TagsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
