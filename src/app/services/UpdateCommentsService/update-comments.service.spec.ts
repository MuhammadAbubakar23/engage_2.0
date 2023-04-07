import { TestBed } from '@angular/core/testing';

import { UpdateCommentsService } from './update-comments.service';

describe('UpdateCommentsService', () => {
  let service: UpdateCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
