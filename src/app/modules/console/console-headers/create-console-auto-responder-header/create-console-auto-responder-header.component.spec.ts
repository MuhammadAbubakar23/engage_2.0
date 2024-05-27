import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsoleAutoResponderHeaderComponent } from './create-console-auto-responder-header.component';

describe('CreateConsoleAutoResponderHeaderComponent', () => {
  let component: CreateConsoleAutoResponderHeaderComponent;
  let fixture: ComponentFixture<CreateConsoleAutoResponderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConsoleAutoResponderHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsoleAutoResponderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
