import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateOverviewComponent } from './view-candidate-overview.component';

describe('ViewCandidateOverviewComponent', () => {
  let component: ViewCandidateOverviewComponent;
  let fixture: ComponentFixture<ViewCandidateOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidateOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
