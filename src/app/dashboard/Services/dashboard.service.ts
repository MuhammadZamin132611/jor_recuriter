import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardConfig } from '../Config/dashboard.config';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,private dashboard: DashboardConfig ) { }

  //GET TOTAL POSITIONS
  GetTotalPosition(reqMan: any) {
    return this.http.get(environment.jobService +this.dashboard.totalposition +`${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  GetCandidatesCount(reqMan: any){
    return this.http.get(environment.candidatesService +this.dashboard.candidatescount +`${reqMan}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  GetMonthlySummary(reqMan: any) {
    return this.http.get(environment.jobAndCandidates +this.dashboard.monthly +`${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }
  SourceMix(reqMan: any) {
    return this.http.get(environment.candidatesService +this.dashboard.sourcemix +`${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error)
        })
      )
  } 


    
  PipelineEngagement(reqMan: string) {
    return this.http.get(`https://jobseeker-service.dev.jobcheck.in/jobseekerservice/jobseeker/candiates/pipeline/${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  getRecruiterDetails(data:string){
    return this.http.get(environment.jobService+this.dashboard.getrecruiterdetails+`${data}`)
  }

  getActiveRequirements(reqMan: any) {
    return this.http.get(environment.requirementService + 'requirements/requirement/' + `${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  ApiGetRecruiterteam(reqMan: any) {
    return this.http.get(`https://user-management-service.dev.jobcheck.in/usermanagement/users/team/${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  
  //Send the token for recruiterManager
sendRecrutierManagerToken(RecruiterId:string,Token:string){
  return this.http.post(environment.RecruiterUrl+`/recruiterManager/${RecruiterId}/recruiterManageToken/${Token}`,Token)
  .pipe(
    catchError((error) => {
      return throwError(error);
    })
  )
}

//Send the token for recruiter

sendRecrutierToken(RecruiterId:string,Token:string){
  return this.http.post(environment.RecruiterUrl+`/recruiter/${RecruiterId}/recruiterToken/${Token}`,Token)
  .pipe(
    catchError((error) => {
      return throwError(error);
    })
  )
}

  //post Recruiter Manager Id
  PostreqmanagerId(data: any) {
    return this.http.post(environment.pushnotificationUrl + 'notification/recruiterManager/recruiterManagerid/recruiterManagerName', data)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

    //post RecruiterId
    PostrecruiterId(data: any) {
      return this.http.post(environment.pushnotificationUrl + 'notification/recruiter/recruiterId/fullName', data)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }

      //Setting tokens for tokenId for RecruiterManager
  RecruiterManagerToken(ReqManId: string, tokens: any, data: any) {
    return this.http.post(environment.pushnotificationUrl + `notification/${ReqManId}/recruiterManagerToken?tokens=${tokens}`, data)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
}

  //Setting tokens for tokenId for Recruiter
  RecruiterToken(ReqId: any, token: any, data: any) {
    return this.http.post(environment.pushnotificationUrl + `notification/${ReqId}/recruiterManagerToken?token=${token}`, data)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })

    );
  }

  getaccount(data:any){
    return this.http.get(environment.RecruiterUrl+`/account/${data}`)
  }

  }

