import { TestBed } from '@angular/core/testing';
import { SkillIdsService } from './skill-ids.service';
describe('SkillIdsService', () => {
  let service: SkillIdsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillIdsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
