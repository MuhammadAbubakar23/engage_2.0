import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderBotInteractionComponent } from './responder-bot-interaction.component';
describe('ResponderBotInteractionComponent', () => {
  let component: ResponderBotInteractionComponent;
  let fixture: ComponentFixture<ResponderBotInteractionComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderBotInteractionComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ResponderBotInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
