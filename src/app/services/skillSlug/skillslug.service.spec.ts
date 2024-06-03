import { TestBed } from '@angular/core/testing';

import { SkillslugService } from './skillslug.service';

describe('SkillslugService', () => {
  let service: SkillslugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillslugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
