import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMainMenuComponent } from './bot-main-menu.component';

describe('BotMainMenuComponent', () => {
  let component: BotMainMenuComponent;
  let fixture: ComponentFixture<BotMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotMainMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
