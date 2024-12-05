import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSearchRoutingModule } from './profile-search-routing.module';
import { SearchComponent } from './Components/search/search.component';
import { ViewSearchResultComponent } from './Components/view-search-result/view-search-result.component';
import { ViewRecentSearchComponent } from './Components/view-recent-search/view-recent-search.component';
import { ViewSavedSearchComponent } from './Components/view-saved-search/view-saved-search.component';
import { SharedModule } from '../shared/shared.module';
import { BooleanSearchComponent } from './Components/boolean-search/boolean-search.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSearchService } from './Services/profile-search.service';
import { Search } from './Config/search.config';
import { ViewJobComponent } from '../jobs/Components/view-job/view-job.component';
import { CandidateService } from '../candidates/Services/candidate.service';
import { Candidate } from '../candidates/Config/candidate.config';


@NgModule({
  declarations: [
    SearchComponent,
    ViewSearchResultComponent,
    ViewRecentSearchComponent,
    ViewSavedSearchComponent,
    BooleanSearchComponent
  ],
  imports: [
    CommonModule,
    ProfileSearchRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[ProfileSearchService,Search,CandidateService,Candidate]
})
export class ProfileSearchModule { }
