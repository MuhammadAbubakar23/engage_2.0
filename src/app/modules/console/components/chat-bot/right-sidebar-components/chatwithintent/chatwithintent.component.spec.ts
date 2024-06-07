import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatwithintentComponent } from './chatwithintent.component';
describe('ChatwithintentComponent', () => {
  let component: ChatwithintentComponent;
  let fixture: ComponentFixture<ChatwithintentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatwithintentComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ChatwithintentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
