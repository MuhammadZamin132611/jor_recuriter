import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { ProfileSearchService } from '../../Services/profile-search.service';
import {  candidatesOverview } from 'src/app/shared/Models/candidates.model';
import { CandidateDetails } from 'src/app/candidates/Models/candidate.model';

@Component({
  selector: 'app-view-search-result',
  templateUrl: './view-search-result.component.html',
  styleUrls: ['./view-search-result.component.scss']
})
export class ViewSearchResultComponent implements OnInit {
  [x: string]: any;
  skillList$: Observable<Array<string>> = of([]);
  search: any;
  searchDetails: any;
  candidatesList: Array<candidatesOverview> = [];
  searchedSkillList: any = []
  selectedSkills: string[] = [];
  booleanList: any;

  constructor(private master: MasterdataService, private searchService: ProfileSearchService) {
    this.skillList$ = this.master.skillList$
    this.search = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('search'))))
    this.booleanList = JSON.parse(localStorage.getItem('booleanResults')!)
  }

  ngOnInit(): void {
    if (this.booleanList==null) {
      this.profileSearch(this.search)
      // this.searchService.getSearchDetails(this.search).subscribe(res => {
      //   console.log(res)
      //   this.searchDetails = res;
      //   this.profileSearch(this.searchDetails)
      //   this.searchedSkillList = this.searchDetails.mustHaveKeyWord.split(',')
      //   console.log(this.searchedSkillList)
      // })
    } else {
      this.booleanResults(this.booleanList)
    }
  }


  profileSearch(res: any) {

    this.searchService.SearchResults(res).subscribe((res: any) => {
      let date1, date2,date3;

      this.candidatesList = res.map((res: any) => {
        date2 = new Date(); 
        date1 = new Date(res.lastSeen); 
        date3=new Date(res.lastUpdated);
        let time_difference = date2.getTime() - date1.getTime();
        let update_difference=date2.getTime() - date3.getTime();
        let days_difference = Math.round(update_difference / (1000 * 60 * 60 * 24));
        let update_days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24));
        return {
          ...res,
          fullName:res.name,
          mobileNumber:res.phoneNumber,
          active:days_difference ,
          update:update_days_difference,
          checked: false
        }
      })
    })
  }
  
  searchCandidates() {
    this.searchedSkillList = [...this.selectedSkills]; 
    this.profileSearch(this.searchDetails);
  }

  booleanResults(data: any) {
    let date1, date2, date3;
    this.candidatesList = data.map((res: any) => {
      date2 = new Date();
      date1 = new Date(res.lastSeen);
      date3 = new Date(res.lastUpdated);
      let time_difference = date2.getTime() - date1.getTime();
      let update_difference = date2.getTime() - date3.getTime();
      let days_difference = Math.round(update_difference / (1000 * 60 * 60 * 24));
      let update_days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24));
      return {
        ...res,
        mobileNumber:res.phoneNumber,
        fullName:res.name,
        active: days_difference,
        update: update_days_difference,
        checked: false
      }
    })
  }
}
