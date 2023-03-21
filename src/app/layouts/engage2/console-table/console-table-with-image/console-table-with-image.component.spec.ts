import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableWithImageComponent } from './console-table-with-image.component';

describe('ConsoleTableWithImageComponent', () => {
  let component: ConsoleTableWithImageComponent;
  let fixture: ComponentFixture<ConsoleTableWithImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableWithImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
