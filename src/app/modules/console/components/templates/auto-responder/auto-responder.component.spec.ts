import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoResponderComponent } from './auto-responder.component';

describe('AutoResponderComponent', () => {
  let component: AutoResponderComponent;
  let fixture: ComponentFixture<AutoResponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoResponderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
