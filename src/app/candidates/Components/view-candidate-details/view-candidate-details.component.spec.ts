import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateDetailsComponent } from './view-candidate-details.component';

describe('ViewCandidateDetailsComponent', () => {
  let component: ViewCandidateDetailsComponent;
  let fixture: ComponentFixture<ViewCandidateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
