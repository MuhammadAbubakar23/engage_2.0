import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxListComponent } from './card-box-list.component';

describe('CardBoxListComponent', () => {
  let component: CardBoxListComponent;
  let fixture: ComponentFixture<CardBoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
