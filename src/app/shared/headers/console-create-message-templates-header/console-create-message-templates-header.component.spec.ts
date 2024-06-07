import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreateMessageTemplatesHeaderComponent } from './console-create-message-templates-header.component';
describe('ConsoleCreateMessageTemplatesHeaderComponent', () => {
  let component: ConsoleCreateMessageTemplatesHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateMessageTemplatesHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateMessageTemplatesHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateMessageTemplatesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
