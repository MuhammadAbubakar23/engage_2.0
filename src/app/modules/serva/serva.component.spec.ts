import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServaComponent } from './serva.component';

describe('ServaComponent', () => {
  let component: ServaComponent;
  let fixture: ComponentFixture<ServaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
