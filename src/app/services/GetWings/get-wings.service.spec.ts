import { TestBed } from '@angular/core/testing';
import { GetWingsService } from './get-wings.service';
describe('GetWingsService', () => {
  let service: GetWingsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWingsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
