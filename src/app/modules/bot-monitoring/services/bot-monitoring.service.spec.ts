import { TestBed } from '@angular/core/testing';

import { BotMonitoringService } from './bot-monitoring.service';

describe('BotMonitoringService', () => {
  let service: BotMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
