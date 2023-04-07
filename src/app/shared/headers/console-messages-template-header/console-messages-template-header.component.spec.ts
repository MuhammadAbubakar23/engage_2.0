import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleMessagesTemplateHeaderComponent } from './console-messages-template-header.component';

describe('ConsoleMessagesTemplateHeaderComponent', () => {
  let component: ConsoleMessagesTemplateHeaderComponent;
  let fixture: ComponentFixture<ConsoleMessagesTemplateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleMessagesTemplateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleMessagesTemplateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
