import { TestBed } from '@angular/core/testing';
import { QueryStatusService } from './query-status.service';
describe('QueryStatusService', () => {
  let service: QueryStatusService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryStatusService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
