import { TestBed } from '@angular/core/testing';
import { GetNewPostService } from './get-new-post.service';
describe('GetNewPostService', () => {
  let service: GetNewPostService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNewPostService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
