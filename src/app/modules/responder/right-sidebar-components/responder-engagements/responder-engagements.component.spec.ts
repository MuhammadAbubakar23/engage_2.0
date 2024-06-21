import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderEngagementsComponent } from './responder-engagements.component';
describe('ResponderEngagementsComponent', () => {
  let component: ResponderEngagementsComponent;
  let fixture: ComponentFixture<ResponderEngagementsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderEngagementsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
