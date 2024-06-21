import { TestBed } from '@angular/core/testing';
import { TicketResponseService } from './ticket-response.service';
describe('TicketResponseService', () => {
  let service: TicketResponseService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketResponseService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
