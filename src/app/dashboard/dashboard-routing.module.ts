import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDahsboardComponent } from './Components/view-dahsboard/view-dahsboard.component';
import { ViewActiveJobsComponent } from './Components/view-active-jobs/view-active-jobs.component';
import { ViewAllActiveJobsComponent } from './Components/view-all-active-jobs/view-all-active-jobs.component';
import { ViewAllActiveTeamComponent } from './Components/view-all-active-team/view-all-active-team.component';
import {NgxPaginationModule} from 'ngx-pagination'
const routes: Routes = [

  {path:'',component:ViewDahsboardComponent },
  {path:'all',component:ViewActiveJobsComponent},
  {path:'view-all-jobs',component:ViewAllActiveJobsComponent},
  {path:'view-all-teams',component:ViewAllActiveTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class DashboardRoutingModule { }
