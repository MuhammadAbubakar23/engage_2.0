import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightHeaderComponentsComponent } from './right-header-components.component';

describe('RightHeaderComponentsComponent', () => {
  let component: RightHeaderComponentsComponent;
  let fixture: ComponentFixture<RightHeaderComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightHeaderComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightHeaderComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
