import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedInteractionHeaderComponent } from './completed-interaction-header.component';
describe('CompletedInteractionHeaderComponent', () => {
  let component: CompletedInteractionHeaderComponent;
  let fixture: ComponentFixture<CompletedInteractionHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedInteractionHeaderComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CompletedInteractionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
