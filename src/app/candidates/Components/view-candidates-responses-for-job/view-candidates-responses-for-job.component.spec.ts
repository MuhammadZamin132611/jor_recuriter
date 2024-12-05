import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatesResponsesForJobComponent } from './view-candidates-responses-for-job.component';

describe('ViewCandidatesResponsesForJobComponent', () => {
  let component: ViewCandidatesResponsesForJobComponent;
  let fixture: ComponentFixture<ViewCandidatesResponsesForJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidatesResponsesForJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidatesResponsesForJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
