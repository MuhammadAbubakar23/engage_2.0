import { TestBed } from '@angular/core/testing';

import { ShareFacebookResponseService } from './share-facebook-response.service';

describe('ShareFacebookResponseService', () => {
  let service: ShareFacebookResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFacebookResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
