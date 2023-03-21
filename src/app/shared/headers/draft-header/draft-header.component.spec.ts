import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftHeaderComponent } from './draft-header.component';

describe('DraftHeaderComponent', () => {
  let component: DraftHeaderComponent;
  let fixture: ComponentFixture<DraftHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
