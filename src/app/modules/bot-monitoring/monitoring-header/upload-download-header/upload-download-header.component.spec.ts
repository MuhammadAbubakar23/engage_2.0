import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDownloadHeaderComponent } from './upload-download-header.component';

describe('UploadDownloadHeaderComponent', () => {
  let component: UploadDownloadHeaderComponent;
  let fixture: ComponentFixture<UploadDownloadHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDownloadHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDownloadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
