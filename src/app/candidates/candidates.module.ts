import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { ViewCandidatesComponent } from './Components/view-candidates/view-candidates.component';
import { ViewCandidateResumeComponent } from './Components/view-candidate-resume/view-candidate-resume.component';
import { ViewCandidateOverviewComponent } from './Components/view-candidate-overview/view-candidate-overview.component';
import { ViewCandidateDetailsComponent } from './Components/view-candidate-details/view-candidate-details.component';
import { ViewCandidatesForJobComponent } from './Components/view-candidates-for-job/view-candidates-for-job.component';
import { ViewCandidatesResponsesForJobComponent } from './Components/view-candidates-responses-for-job/view-candidates-responses-for-job.component';
import { Candidate } from './Config/candidate.config';
import { CandidateService } from './Services/candidate.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [

  
    ViewCandidatesComponent,
        ViewCandidateResumeComponent,
        ViewCandidateOverviewComponent,
        ViewCandidateDetailsComponent,
        ViewCandidatesForJobComponent,
        ViewCandidatesResponsesForJobComponent,
  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    PdfViewerModule,
    SharedModule,
    // BrowserAnimationsModule ,
    MatTooltipModule
  ],
  providers:[
    CandidateService,Candidate
  ]
})
export class CandidatesModule { }
