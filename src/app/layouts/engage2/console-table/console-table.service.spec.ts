import { TestBed } from '@angular/core/testing';

import { ConsoleTableService } from './console-table.service';

describe('ConsoleTableService', () => {
  let service: ConsoleTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
