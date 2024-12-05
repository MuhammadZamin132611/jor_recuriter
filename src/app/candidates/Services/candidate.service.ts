import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Candidate } from '../Config/candidate.config';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private candidate: Candidate) { }

  // getCandidateDetails(profileId: string) {
  //   return this.http.get(environment.candidateService + this.candidate.compeleteDetails + `${profileId}`)
  //     .pipe(
  //       catchError((error) => {
  //         return throwError(error);
  //       })
  //     );
  // }
  getCandidateDetails(profileId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.candidate.compeleteDetails + `${profileId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  CandidateResponse(profileId: string , jobId:string){
    return this.http.get(environment.jobAndCandidates + "appliedjobs/questionsanswers/" + `${profileId}` + "/" + `${jobId}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );

  }

  downloadResume(profileId: string) {
    return this.http.get(environment.candidateService + this.candidate.downloadResume + `${profileId}/downloadresume`, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  getResume(profileId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.candidate.downloadResume + `${profileId}/getresume`)
      .pipe(map((res) => {
        return res
      })
      );

  }
  getBio(profileId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.candidate.downloadResume + `${profileId}/personalBio`)
  }

  getFullDetails(profileId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.candidate.jobseekerprofileDetails + `${profileId}`)
  }

  getCertificate(profileId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.candidate.downloadResume + `${profileId}` + "/certificateInfo")
  } 
  
  //Download resume for candidate
  downlodResume(filename: any) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(environment.candidateService + this.candidate.resume+`${filename}`, {
      responseType: 'blob' as 'json'
    })
  }

   //Get actie requirements of the recruiter for candidate skills
   getActiveReq(accountId: any, profileId: any) {
    return this.http.get(environment.RecruiterUrl + `/recruiter/activerequirementswithmatchingskills/${accountId}/${profileId}`)
  }

  // Post Api for sourcing candidate
  postSourcedCanidate(profileId:string,JobId:string,accountId:string,val:any){
    return this.http.post(environment.candidateService+this.candidate.source+`/${profileId}/${JobId}/${accountId}`,val)
}  
//GET API FOR sourced CANDIDATE
  GetApisourced(jobId: any) {
    return this.http.get(environment.candidateService + this.candidate.sourced+`${jobId}/`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

   //post source candidates
   sourceCandidate(profileId: any, jobId: any, managerId: any, source: any) {
    return this.http.post(environment.jobAndCandidates + `candidate/sourced/` + `${profileId}/${jobId}/${managerId}?sourcedBy=${source}`, source)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );
  }

    RecruiterView(accountId: string, profileId: any) {
    return this.http.post(environment.pushnotificationUrl + `notification/recruiterView/${accountId}/${profileId}`,{})
      .pipe(map((res: any) => {
        return res;
      }))

  }

}
