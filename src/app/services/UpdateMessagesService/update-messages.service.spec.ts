import { TestBed } from '@angular/core/testing';
import { UpdateMessagesService } from './update-messages.service';
describe('UpdateMessagesService', () => {
  let service: UpdateMessagesService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMessagesService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
