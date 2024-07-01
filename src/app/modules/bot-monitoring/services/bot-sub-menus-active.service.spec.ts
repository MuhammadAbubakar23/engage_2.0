import { TestBed } from '@angular/core/testing';

import { BotSubMenusActiveService } from './bot-sub-menus-active.service';

describe('BotSubMenusActiveService', () => {
  let service: BotSubMenusActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotSubMenusActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
