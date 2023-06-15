import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotbuilderComponent } from './botbuilder.component';

describe('BotbuilderComponent', () => {
  let component: BotbuilderComponent;
  let fixture: ComponentFixture<BotbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotbuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
