import { TestBed } from '@angular/core/testing';

import { UpdateListService } from './update-list.service';

describe('UpdateListService', () => {
  let service: UpdateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
