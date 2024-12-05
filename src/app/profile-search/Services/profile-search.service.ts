import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Search } from '../Config/search.config';

@Injectable({
  providedIn: 'root'
})
export class ProfileSearchService {
  skillList$: any;
  constructor(private http: HttpClient,private search:Search) { }

  //new ProfileSearch
  getDetails(data: string, value: any) {
    let res = '';
    if (value != '' && value != null) {
      return res = data + '=' + value;
    }
    return res;
  }

  getExp(ExpeTye: string, exp: null) {
    let res = '';
    if (exp != '' && exp != null) {
      return res = ExpeTye + '=' + exp;
    }
    return res = ExpeTye + '=' + 0
  }

  /// new profile search
  SearchResults(data: any) {
    const skills = this.getDetails('skills', data?.mustHaveKeyWord);
    const location = this.getDetails('&locations', data?.location);
    const educationQualifications = this.getDetails('&educationQualifications', data?.educationalQualification);
    const minSalary = this.getDetails('&minSalary', data?.minSalary);
    const maxSalary = this.getDetails('&maxSalary', data?.maxSalary);
    const noticePeriod = this.getDetails('&noticePeriod', data?.noticePeriod);
    const minExperirence = this.getExp('&minExperirence', data?.minExp);
    const maxExperience = this.getExp('&maxExperience', data?.maxExp);
    const areaOfInterests = this.getDetails('&areaOfInterests', data?.industry);
    const designation = this.getDetails('&designation', data?.designation);
    const startYear = this.getDetails('&startYear', data?.startDate == null ? data?.startDate : data?.startDate.slice(0, 4));
    const endYear = this.getDetails('&endYear', data?.endDate == null ? data?.endDate : data?.endDate.slice(0, 4));


    // add remaining fields
    let urlAppend = skills + location + educationQualifications + minSalary + maxSalary + noticePeriod + minExperirence + maxExperience + areaOfInterests + designation + startYear + endYear

    return this.http.get(environment.searchCandidates + `profile/details/?${urlAppend}`)

  }

  SendSearchdata(reqId: any, value: boolean, data: any) {
    return this.http.post(environment.jobService + `recruiter/profilesearch/${reqId}?saved=${value}`, data)
  }

  //recentSearch
  recentSearch(recruiterId: any) {
    return this.http.get(environment.jobService + `recruiter/recentsearch/${recruiterId}`)
  }
  //savedSearch
  svaedSearch(recruiterId: any) {
    return this.http.get(environment.jobService + `recruiter/savedsearch/${recruiterId}`)
  }
    //ParitcularSearch
    getSearchDetails(id:string){
      return this.http.get(environment.jobService+this.search.searchDetails+`${id}`)
        }
        getValues(data:string,values:Array<string>){
          let res = '';
          if ( values.length!=0) {
            return res = data + '=' + values;
          }
          return res;
        }
    //Boolean Searh Results
    getBooleanSearch(jobTitle:Array<string>,skills:Array<string>,orSkills:Array<string>,notSkills:Array<string>,location:Array<string>){
      const Title=this.getValues("jobtitles",jobTitle)
      const skillsList=this.getValues("skillsInclude",skills)
      const orSkillList=this.getValues("orSkills",orSkills)
      const notSkillList=this.getValues("notSkills",notSkills)
      const locationList=this.getValues("locations",location)
     const jointlist=[Title,skillsList,orSkillList,notSkillList,locationList].filter(str => str !== '').join('&');

      return this.http.get(environment.searchCandidates+this.search.booleanSearch+`${ jointlist
      }`)
    }
}
