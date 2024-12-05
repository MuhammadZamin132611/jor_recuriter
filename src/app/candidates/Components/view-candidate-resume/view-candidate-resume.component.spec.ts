import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateResumeComponent } from './view-candidate-resume.component';

describe('ViewCandidateResumeComponent', () => {
  let component: ViewCandidateResumeComponent;
  let fixture: ComponentFixture<ViewCandidateResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidateResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidateResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
