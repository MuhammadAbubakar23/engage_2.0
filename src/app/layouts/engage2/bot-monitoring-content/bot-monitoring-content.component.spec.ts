import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMonitoringComponent } from './bot-monitoring.component';

describe('BotMonitoringComponent', () => {
  let component: BotMonitoringComponent;
  let fixture: ComponentFixture<BotMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
