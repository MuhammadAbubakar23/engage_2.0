import { TestBed } from '@angular/core/testing';
import { ClosePanelService } from './close-panel.service';
describe('ClosePanelService', () => {
  let service: ClosePanelService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosePanelService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
