import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCandidateOverviewComponent } from './Components/view-candidate-overview/view-candidate-overview.component';

const routes: Routes = [

  {path:'overview',component:ViewCandidateOverviewComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
