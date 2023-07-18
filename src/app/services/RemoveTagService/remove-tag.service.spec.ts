import { TestBed } from '@angular/core/testing';

import { RemoveTagService } from './remove-tag.service';

describe('RemoveTagService', () => {
  let service: RemoveTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
