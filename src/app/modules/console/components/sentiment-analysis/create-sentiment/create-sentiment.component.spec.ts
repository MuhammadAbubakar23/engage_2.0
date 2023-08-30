import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSentimentComponent } from './create-sentiment.component';

describe('CreateSentimentComponent', () => {
  let component: CreateSentimentComponent;
  let fixture: ComponentFixture<CreateSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSentimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
