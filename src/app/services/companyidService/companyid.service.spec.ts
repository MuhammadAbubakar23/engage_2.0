import { TestBed } from '@angular/core/testing';
import { CompanyidService } from './companyid.service';
describe('CompanyidService', () => {
  let service: CompanyidService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyidService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
