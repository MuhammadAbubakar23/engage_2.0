import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMonitoringMenusComponent } from './bot-monitoring-menus.component';

describe('BotMonitoringMenusComponent', () => {
  let component: BotMonitoringMenusComponent;
  let fixture: ComponentFixture<BotMonitoringMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotMonitoringMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMonitoringMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
