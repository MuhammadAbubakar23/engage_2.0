import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBotConfigurationComponent } from './create-bot-configuration.component';

describe('CreateBotConfigurationComponent', () => {
  let component: CreateBotConfigurationComponent;
  let fixture: ComponentFixture<CreateBotConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBotConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBotConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
