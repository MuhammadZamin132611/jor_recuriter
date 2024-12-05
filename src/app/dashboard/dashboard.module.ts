import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewActiveJobsComponent } from './Components/view-active-jobs/view-active-jobs.component';
import { ViewActiveTeamComponent } from './Components/view-active-team/view-active-team.component';
import { ViewAllActiveTeamComponent } from './Components/view-all-active-team/view-all-active-team.component';
import { ViewAllActiveJobsComponent } from './Components/view-all-active-jobs/view-all-active-jobs.component';
import { ViewDahsboardComponent } from './Components/view-dahsboard/view-dahsboard.component';
import { ViewPipelineChartComponent } from './Components/view-pipeline-chart/view-pipeline-chart.component';
import { ViewConversionRatioComponent } from './Components/view-conversion-ratio/view-conversion-ratio.component';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardConfig } from './Config/dashboard.config';
import { DashboardService } from './Services/dashboard.service';
import { ChartsService } from './Services/charts.service';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ViewActiveJobsComponent,
    ViewActiveTeamComponent,
    ViewAllActiveTeamComponent,
    ViewAllActiveJobsComponent,
    ViewDahsboardComponent,
    ViewPipelineChartComponent,
    ViewConversionRatioComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule,
    MatPaginatorModule
  ],
  exports:[

  ],providers: [DashboardConfig,DashboardService,ChartsService]
})
export class DashboardModule { }
