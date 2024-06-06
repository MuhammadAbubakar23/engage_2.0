import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleBotConfigurationHeaderComponent } from './console-bot-configuration-header.component';

describe('ConsoleBotConfigurationHeaderComponent', () => {
  let component: ConsoleBotConfigurationHeaderComponent;
  let fixture: ComponentFixture<ConsoleBotConfigurationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleBotConfigurationHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleBotConfigurationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
