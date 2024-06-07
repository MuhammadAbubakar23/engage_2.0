import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreateTagsHeaderComponent } from './console-create-tags-header.component';
describe('ConsoleCreateTagsHeaderComponent', () => {
  let component: ConsoleCreateTagsHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateTagsHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateTagsHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateTagsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
