import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobOverviewComponent } from './view-job-overview.component';

describe('ViewJobOverviewComponent', () => {
  let component: ViewJobOverviewComponent;
  let fixture: ComponentFixture<ViewJobOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
