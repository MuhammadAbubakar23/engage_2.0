import { TestBed } from '@angular/core/testing';

import { ChatbotIdService } from './chatbot-id.service';

describe('ChatbotIdService', () => {
  let service: ChatbotIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
