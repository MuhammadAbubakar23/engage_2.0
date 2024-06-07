import { TestBed } from '@angular/core/testing';
import { FetchIdService } from './fetch-id.service';
describe('FetchIdService', () => {
  let service: FetchIdService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchIdService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
