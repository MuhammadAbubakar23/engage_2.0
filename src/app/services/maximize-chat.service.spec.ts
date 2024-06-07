import { TestBed } from '@angular/core/testing';
import { MaximizeChatService } from './maximize-chat.service';
describe('MaximizeChatService', () => {
  let service: MaximizeChatService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaximizeChatService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
