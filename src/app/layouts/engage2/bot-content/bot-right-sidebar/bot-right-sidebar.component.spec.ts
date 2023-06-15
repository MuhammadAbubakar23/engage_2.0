import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotRightSidebarComponent } from './bot-right-sidebar.component';

describe('BotRightSidebarComponent', () => {
  let component: BotRightSidebarComponent;
  let fixture: ComponentFixture<BotRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotRightSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
