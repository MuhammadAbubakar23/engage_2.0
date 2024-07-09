import { TestBed } from '@angular/core/testing';

import { ActorsInfoService } from './actors-info.service';

describe('ActorsInfoService', () => {
  let service: ActorsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
