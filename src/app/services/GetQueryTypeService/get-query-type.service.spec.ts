import { TestBed } from '@angular/core/testing';

import { GetQueryTypeService } from './get-query-type.service';

describe('GetQueryTypeService', () => {
  let service: GetQueryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQueryTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
