import { TestBed } from '@angular/core/testing';
import { HeaderCountService } from './header-count.service';
describe('UnrespondedCountService', () => {
  let service: HeaderCountService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderCountService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
