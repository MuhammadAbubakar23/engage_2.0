import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatwithsentimentComponent } from './chatwithsentiment.component';
describe('ChatwithsentimentComponent', () => {
  let component: ChatwithsentimentComponent;
  let fixture: ComponentFixture<ChatwithsentimentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatwithsentimentComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ChatwithsentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
