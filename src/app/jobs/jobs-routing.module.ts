import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllJobsComponent } from './Components/view-all-jobs/view-all-jobs.component';
import { AddJobComponent } from './Components/add-job/add-job.component';
import { EditJobComponent } from './Components/edit-job/edit-job.component';
import { ViewJobComponent } from './Components/view-job/view-job.component';
import { ViewJobDetailsComponent } from './Components/view-job-details/view-job-details.component';
import { ViewJobCandidatesComponent } from './Components/view-job-candidates/view-job-candidates.component';
import { ViewJobOverviewComponent } from './Components/view-job-overview/view-job-overview.component';

const routes: Routes = [
  { path: 'view-all-jobs', component: ViewAllJobsComponent,pathMatch: 'full' },
  { path: 'create-job', component: AddJobComponent },
  { path: 'edit-job', component: EditJobComponent },
  {
    path: 'view-job', component: ViewJobComponent,
    children: [
      { path: 'job-details', component: ViewJobDetailsComponent },
      { path: 'candidates-details', component: ViewJobCandidatesComponent },
      { path: 'overview', component: ViewJobOverviewComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
