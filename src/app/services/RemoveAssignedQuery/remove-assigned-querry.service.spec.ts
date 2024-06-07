import { TestBed } from '@angular/core/testing';
import { RemoveAssignedQuerryService } from './remove-assigned-querry.service';
describe('RemoveAssignedQuerryService', () => {
  let service: RemoveAssignedQuerryService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveAssignedQuerryService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
