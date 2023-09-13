import { TestBed } from '@angular/core/testing';

import { DataExchangeServicesService } from './data-exchange-services.service';

describe('DataExchangeServicesService', () => {
  let service: DataExchangeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExchangeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
