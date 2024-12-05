import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobCandidatesComponent } from './view-job-candidates.component';

describe('ViewJobCandidatesComponent', () => {
  let component: ViewJobCandidatesComponent;
  let fixture: ComponentFixture<ViewJobCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
