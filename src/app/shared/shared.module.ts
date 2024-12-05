import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { HeaderComponent } from './Components/header/header.component';
import { EditJobStatusComponent } from './Components/edit-job-status/edit-job-status.component';
import { SendEmailSmsComponent } from './Components/send-email-sms/send-email-sms.component';
import { MasterData } from './Config/master-data.config';
import { MasterdataService } from './Services/masterdata.service';
import { RouterModule } from '@angular/router';
import { ViewCandidatesComponent } from './Components/view-candidates/view-candidates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEditorModule } from 'ngx-editor';
import { Message } from './Config/message.config';
import { MessageService } from './Services/message.service';
import { CandidatesModule } from '../candidates/candidates.module';
import { resumeBuilder } from './resume.builder';
import { JobsModule } from '../jobs/jobs.module';
import { ViewJobComponent } from '../jobs/Components/view-job/view-job.component';
import { JobsService } from '../jobs/Services/jobs.service';
import { JobsConfig } from '../jobs/Config/jobs.config';
import { JobOverviewService } from '../jobs/Services/job-overview.service';
import { AccountService } from '../authentication/Services/account.service';
import { AccountConfig } from '../authentication/Config/account.config';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    EditJobStatusComponent,
    SendEmailSmsComponent,
    ViewCandidatesComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxEditorModule,
    // CandidatesModule,
    MatTooltipModule
  ],
  exports: [
    SideBarComponent,
    HeaderComponent,
    ViewCandidatesComponent,
    SendEmailSmsComponent
  ],
  providers: [MasterData, MasterdataService, Message, MessageService,resumeBuilder,ViewJobComponent,JobOverviewService,JobsService,JobsConfig,AccountService,AccountConfig]
})
export class SharedModule { }
