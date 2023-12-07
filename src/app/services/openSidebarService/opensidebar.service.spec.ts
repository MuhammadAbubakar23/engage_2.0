import { TestBed } from '@angular/core/testing';

import { OpensidebarService } from './opensidebar.service';

describe('OpensidebarService', () => {
  let service: OpensidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpensidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
