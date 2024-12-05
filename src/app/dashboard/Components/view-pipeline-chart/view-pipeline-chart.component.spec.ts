import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPipelineChartComponent } from './view-pipeline-chart.component';

describe('ViewPipelineChartComponent', () => {
  let component: ViewPipelineChartComponent;
  let fixture: ComponentFixture<ViewPipelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPipelineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPipelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
