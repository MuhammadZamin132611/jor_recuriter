import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActiveJobsComponent } from './view-active-jobs.component';

describe('ViewActiveJobsComponent', () => {
  let component: ViewActiveJobsComponent;
  let fixture: ComponentFixture<ViewActiveJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActiveJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
