import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatesForJobComponent } from './view-candidates-for-job.component';

describe('ViewCandidatesForJobComponent', () => {
  let component: ViewCandidatesForJobComponent;
  let fixture: ComponentFixture<ViewCandidatesForJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidatesForJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidatesForJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
