import { TestBed } from '@angular/core/testing';

import { FetchPostTypeService } from './fetch-post-type.service';

describe('FetchPostTypeService', () => {
  let service: FetchPostTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchPostTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
