import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxListCheckboxComponent } from './card-box-list-checkbox.component';

describe('CardBoxListCheckboxComponent', () => {
  let component: CardBoxListCheckboxComponent;
  let fixture: ComponentFixture<CardBoxListCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxListCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxListCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
