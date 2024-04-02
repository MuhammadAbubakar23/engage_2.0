import { TestBed } from '@angular/core/testing';

import { RulesGroupIdsService } from './rules-group-ids.service';

describe('RulesGroupIdsService', () => {
  let service: RulesGroupIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesGroupIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
