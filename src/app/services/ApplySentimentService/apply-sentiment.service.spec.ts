import { TestBed } from '@angular/core/testing';

import { ApplySentimentService } from './apply-sentiment.service';

describe('ApplySentimentService', () => {
  let service: ApplySentimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplySentimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
