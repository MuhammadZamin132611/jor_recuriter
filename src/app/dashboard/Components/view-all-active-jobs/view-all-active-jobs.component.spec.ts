import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllActiveJobsComponent } from './view-all-active-jobs.component';

describe('ViewAllActiveJobsComponent', () => {
  let component: ViewAllActiveJobsComponent;
  let fixture: ComponentFixture<ViewAllActiveJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllActiveJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllActiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

