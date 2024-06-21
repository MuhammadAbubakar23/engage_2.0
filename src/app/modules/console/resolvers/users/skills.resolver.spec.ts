import { TestBed } from '@angular/core/testing';
import { SkillsResolver } from './skills.resolver';
describe('SkillsResolver', () => {
  let resolver: SkillsResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SkillsResolver);
  });
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
