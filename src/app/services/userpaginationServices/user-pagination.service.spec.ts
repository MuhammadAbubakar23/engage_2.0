import { TestBed } from '@angular/core/testing';

import { UserPaginationService } from './user-pagination.service';

describe('UserPaginationService', () => {
  let service: UserPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
