import { TestBed } from '@angular/core/testing';
import { LeftsidebarExpandedService } from './leftsidebar-expanded.service';
describe('LeftsidebarExpandedService', () => {
  let service: LeftsidebarExpandedService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftsidebarExpandedService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
