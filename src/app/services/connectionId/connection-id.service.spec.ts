import { TestBed } from '@angular/core/testing';
import { ConnectionIdService } from './connection-id.service';
describe('ConnectionIdService', () => {
  let service: ConnectionIdService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionIdService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
