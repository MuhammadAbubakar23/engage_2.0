import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleEnteractRouteHeaderComponent } from './console-enteract-route-header.component';

describe('ConsoleEnteractRouteHeaderComponent', () => {
  let component: ConsoleEnteractRouteHeaderComponent;
  let fixture: ComponentFixture<ConsoleEnteractRouteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleEnteractRouteHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleEnteractRouteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
