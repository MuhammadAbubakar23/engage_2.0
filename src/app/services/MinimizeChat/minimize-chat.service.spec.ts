import { TestBed } from '@angular/core/testing';

import { MinimizeChatService } from './minimize-chat.service';

describe('MinimizeChatService', () => {
  let service: MinimizeChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinimizeChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
