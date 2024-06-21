import { TestBed } from '@angular/core/testing';
import { CompaniesTeamsResolver } from './companies-teams.resolver';
describe('CompaniesTeamsResolversResolver', () => {
  let resolver: CompaniesTeamsResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesTeamsResolver);
  });
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
