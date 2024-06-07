import { TestBed } from '@angular/core/testing';
import { CompaniesPropResolver } from './companies-prop.resolver';
describe('CompaniesPropResolver', () => {
  let resolver: CompaniesPropResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompaniesPropResolver);
  });
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
