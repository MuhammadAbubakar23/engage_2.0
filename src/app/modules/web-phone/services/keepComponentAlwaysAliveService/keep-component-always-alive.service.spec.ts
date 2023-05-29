import { TestBed } from '@angular/core/testing';

import { KeepComponentAlwaysAliveService } from './keep-component-always-alive.service';

describe('KeepComponentAlwaysAliveService', () => {
  let service: KeepComponentAlwaysAliveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepComponentAlwaysAliveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
