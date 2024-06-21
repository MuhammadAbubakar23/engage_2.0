import { TestBed } from '@angular/core/testing';
import { UnRespondedCountService } from './un-responded-count.service';
describe('UnRespondedCountService', () => {
  let service: UnRespondedCountService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnRespondedCountService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
