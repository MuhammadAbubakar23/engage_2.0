import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateBotConfigurationHeaderComponent } from './console-create-bot-configuration-header.component';

describe('ConsoleCreateBotConfigurationHeaderComponent', () => {
  let component: ConsoleCreateBotConfigurationHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateBotConfigurationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateBotConfigurationHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCreateBotConfigurationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
