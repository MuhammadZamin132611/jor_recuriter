import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JobsConfig } from '../Config/jobs.config';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobOverviewService {

  constructor(private http: HttpClient, private job: JobsConfig) { }

  //GET API FOR APPLIED JOBS
  getApplied(jobId: string) {
    return this.http.get<number>(environment.jobAndCandidates + this.job.candidates.applied + `job/${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }


  GetSourced(jobId: string) {
    return this.http.get<number>(environment.jobAndCandidates + this.job.candidates.sourced + `${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

  GetShortlisted(jobId: string) {
    return this.http.get<number>(environment.jobAndCandidates + this.job.candidates.shortlisted + `job/${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

  GetOffered(jobId: string) {
    return this.http.get<number>(environment.
      jobAndCandidates + this.job.candidates.offered + `job/${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }
  GetRejected(jobId: string) {
    return this.http.get<number>(environment.jobAndCandidates + this.job.candidates.rejected + `job/${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }
//New candidate url
  getCandidatesOfJob(jobId: string) {
    return this.http.get(environment.jobSeekerProfleService + this.job.candidatesList + `${jobId}/overview`)
  }

  getcandidates(jobId:string){
return this.http.get(environment.jobAndCandidates+this.job.candidates.list+`${jobId}`)
  }
  ChangeStatuscandidate(ProfileId:string,jobId:string,accountId:string,value:string,reasons:string,comment:string){
    let comments=''
    if(comment!=''&&comment!=null){
comments='&comment='+comment
    }
    return this.http.post(environment.jobAndCandidates+this.job.candidateStatus+`comment/${ProfileId}/${jobId}/${accountId}/?action=${value}&reasons=${reasons}${comments}`,comment)
  }

   //Notification for Shortlisted
   ShortlistedNotification(JobId: string, profileId: any) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/shortlisted?profileId=${profileId}&jobId=${JobId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  //Notification for offered
  OfferedNotification(JobId: string, profileId: any) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/offered?profileId=${profileId}&jobId=${JobId}`, data)
   // https://pushnotification-service.dev.jobcheck.in/notification/notification/offered?profileId=0048d31c-2bdc-4d48-8cc7-b65a78e7b242&jobId=59a831a0-8303-47d4-a3bd-4cc542b9dcb1
      .pipe(map((res: any) => {
        return res;
      }))

  }

  OfferedSMS(jobId:any,phoneNumber:any,data:any){
    return this.http.post(environment.pushnotificationUrl + `notification/sms/offered?jobId=${jobId}&phoneNumber=${phoneNumber}`,data)
    .pipe(map((res: any) => {
      return res;
    }))
  
  }


  //Shortlisted notification using SMS 

ShortlistedSMS(jobId:any,phoneNumber:any,profileID:any,data:any){
  return this.http.post(environment.pushnotificationUrl + `notification/sms/shortlisted?jobId=${jobId}&phoneNumber=${phoneNumber}&profileID=${profileID}`,data)
  .pipe(map((res: any) => {
    return res;
  }))

}

SourcedSMS(jobId:any,phoneNumber:any,data:any,profileId:any){
  return this.http.post(environment.pushnotificationUrl + `notification/sms/sourced?jobId=${jobId}&phoneNumber=${phoneNumber}&profileId=${profileId}`,data)
  .pipe(map((res: any) => {
    return res;
  }))

}

  //Sourced Notification
  SourcedNotification(JobId: any, profileId: any) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/sourced/candidate/${JobId}/${profileId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }


}
