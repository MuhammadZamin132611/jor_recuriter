import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, NonAuthGuardService } from './auth-guard.service';



const routes: Routes = [

  { path: '', loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule),},
  { path: 'jobs', loadChildren:() => import('./jobs/jobs.module').then(m => m.JobsModule),canActivate:[AuthGuardService]},
  { path: 'dashboard', loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuardService]},
  { path: 'profilesearch', loadChildren:() => import('./profile-search/profile-search.module').then(m => m.ProfileSearchModule),canActivate:[AuthGuardService]},
  { path: 'candidate', loadChildren:() => import('./candidates/candidates.module').then(m => m.CandidatesModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
