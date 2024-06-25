import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotConfigurationComponent } from './bot-configuration.component';

describe('BotConfigurationComponent', () => {
  let component: BotConfigurationComponent;
  let fixture: ComponentFixture<BotConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
