import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnoozedHeaderComponent } from './snoozed-header.component';

describe('SnoozedeHeaderComponent', () => {
  let component: SnoozedHeaderComponent;
  let fixture: ComponentFixture<SnoozedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnoozedHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnoozedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
