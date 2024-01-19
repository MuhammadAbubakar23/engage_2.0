import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrInputContentComponent } from './ivr-input-content.component';

describe('IvrInputContentComponent', () => {
  let component: IvrInputContentComponent;
  let fixture: ComponentFixture<IvrInputContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IvrInputContentComponent]
    });
    fixture = TestBed.createComponent(IvrInputContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
