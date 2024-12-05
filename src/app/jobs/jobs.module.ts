import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { EditJobComponent } from './Components/edit-job/edit-job.component';
import { ViewAllJobsComponent } from './Components/view-all-jobs/view-all-jobs.component';
import { ViewJobComponent } from './Components/view-job/view-job.component';
import { ViewJobCandidatesComponent } from './Components/view-job-candidates/view-job-candidates.component';
import { ViewJobDetailsComponent } from './Components/view-job-details/view-job-details.component';
import { ViewJobOverviewComponent } from './Components/view-job-overview/view-job-overview.component';
import { ViewJobRecommendedCandidatesComponent } from './Components/view-job-recommended-candidates/view-job-recommended-candidates.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsService } from './Services/jobs.service';
import { JobsConfig } from './Config/jobs.config';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { JobOverviewService } from './Services/job-overview.service';
import { EditJobStatusComponent } from './Components/edit-job-status/edit-job-status.component';
import { ViewJobActionsComponent } from './Components/view-job-actions/view-job-actions.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CandidatesModule } from '../candidates/candidates.module';



@NgModule({
  declarations: [
    AddJobComponent,
    EditJobComponent,
    ViewAllJobsComponent,
    ViewJobComponent,
    ViewJobCandidatesComponent,
    ViewJobDetailsComponent,
    ViewJobOverviewComponent,
    ViewJobRecommendedCandidatesComponent,
    EditJobStatusComponent,
    ViewJobActionsComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    MatTableModule ,
    MatSortModule,
    MatPaginatorModule ,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    CandidatesModule,
    NgxSkeletonLoaderModule,
    MatTooltipModule
  ],
  providers:[JobsService,JobsConfig,DatePipe,JobOverviewService],
  // exports:[ViewJobComponent]
})
export class JobsModule { }
