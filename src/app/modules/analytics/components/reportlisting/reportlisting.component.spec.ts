import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlistingComponent } from './reportlisting.component';

describe('ReportlistingComponent', () => {
  let component: ReportlistingComponent;
  let fixture: ComponentFixture<ReportlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
