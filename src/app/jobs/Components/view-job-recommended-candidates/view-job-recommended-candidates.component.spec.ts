import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobRecommendedCandidatesComponent } from './view-job-recommended-candidates.component';

describe('ViewJobRecommendedCandidatesComponent', () => {
  let component: ViewJobRecommendedCandidatesComponent;
  let fixture: ComponentFixture<ViewJobRecommendedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobRecommendedCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobRecommendedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
