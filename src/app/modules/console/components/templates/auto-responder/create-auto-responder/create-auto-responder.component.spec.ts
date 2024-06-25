import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAutoResponderComponent } from './create-auto-responder.component';

describe('CreateAutoResponderComponent', () => {
  let component: CreateAutoResponderComponent;
  let fixture: ComponentFixture<CreateAutoResponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAutoResponderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAutoResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
