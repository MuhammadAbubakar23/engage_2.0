import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateIntentsComponent } from './update-intents.component';
describe('UpdateIntentsComponent', () => {
  let component: UpdateIntentsComponent;
  let fixture: ComponentFixture<UpdateIntentsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIntentsComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UpdateIntentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
