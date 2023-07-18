import { TestBed } from '@angular/core/testing';

import { AddTagService } from './add-tag.service';

describe('AddTagService', () => {
  let service: AddTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
