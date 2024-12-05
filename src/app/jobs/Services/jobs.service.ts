import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, shareReplay, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobsConfig } from '../Config/jobs.config';
import { JobDetails } from '../Models/job.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private baseUrl = 'https://requirement-service.dev.jobcheck.in';
  constructor(private http: HttpClient, private jobs: JobsConfig) { }



  // To get all the jobs of the user

  // getTotalRequirements(reqMan: any) {
  //   const data = localStorage.getItem('accountId')
  //   return this.http.get(environment.jobService + this.jobs.totalJobs + `${data}`)
  //     .pipe(
  //       catchError((error) => {
  //         return throwError(error);
  //       }), map(res => {
  //         return res
  //       })
  //     )
  // }

  getTotalRequirements(reqMan: any) {
    const data = localStorage.getItem('accountId')
    return this.http.get(environment.requirementService + 'requirements/jobsummary/' + `${data}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }), map(res => {
          return res
        })
      )
  }
  //To change the bookmark status of the job

  changeBookmark(data: any, id: any) {

    return this.http.put(environment.jobService + this.jobs.bookMark + `${id}/${data}`, data)
  }


  //To Get the particular  Job details

  // "https://requirement-service.dev.jobcheck.in/requirement/"
  //requirement-service.dev.jobcheck.in/requirement/requirement/data/e0215f53-04ca-4106-ba32-4af043ef77b9

  getJobDetails(jobId: any) {
    return this.http.get<JobDetails>(environment.requirementService +`requirement/data/${jobId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );
  }
   
  getAssignrecruiter(jobId:any){
    return this.http.get<any>(environment.requirementService +`requirement/assign-account${jobId}/`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );
  }
  //To get the recruiters for the RecruiterManager

  getRecruitersAccount(reqManId: string) {
    return this.http.get(environment.usermanagementService + this.jobs.recruiters + `${reqManId}`)
      // .pipe(
      //   catchError((error) => {
      //     return throwError(error);
      //   })

      // );
  }
  getRequirementDetails(id1:any) {
    
    return this.http.get(environment.requirementService + this.jobs.job.requirementData+id1)
      
  }
  // https://requirement-service.dev.jobcheck.in/requirement/requirement/job/3fa85f64-5717-4562-b3fc-2c963f66afa6

  UpdateReq(requirementId:any,data:any) {
    const createatorID = localStorage.getItem('createatorID')
    return this.http.put<JobDetails>(environment.requirementService+`requirement/job/${requirementId}`,data)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );
  }

  EditJob(userid:any,data:any) {
    return this.http.put(environment.requirementService + this.jobs.job.requirementData + userid,data)
  }

  LastModified(RequirementId:any) {
    return this.http.get(environment.requirementService + this.jobs.Modified + RequirementId )
  }
  
  Assigned(RequirementId:any){
    return this.http.get(environment.requirementService + this.jobs.AssignedTo + RequirementId)
  }
  
  // To publish th job

  publishJob(data: any, accountId: any,) {
  
      return this.http.post(environment.requirementService+this.jobs.postRequirement+accountId,data)
       .pipe(map((res: any) => {
        return res;
      }))
  }
  
  deleteJob(jobId: string) {
    return this.http.delete(environment.requirementService + this.jobs.deleteJob + `${jobId}`, { responseType: `text` })
  }

  //To update the job 
  updateJob(jobId: string,accountId: any, jobDetails: JobDetails) {
    return this.http.put(environment.jobService + this.jobs.updateJob + `${accountId}/${jobId}`, jobDetails)
  }
  getCurrentData(jobId: string) {
    return this.http.get(environment.jobService + this.jobs.updateJob + `${jobId}`)
  }


  //Add-location to the job
  addLocation(jobId: string, location: string) {
    return this.http.post(environment.jobService + this.jobs.job.locationAdd + `${jobId}/locations?locations=${location}`, { locationId: '', city: location })
  }
  //Add-perks to the job
  addPerks(jobId: string, perk: string) {
    return this.http.post(environment.jobService + this.jobs.job.perkAdd + `${jobId}/{jobperk}?jobperk=${perk}`, { perk: perk })
  }

  //Add-perks to the job
  addEducation(jobId: string, Education: string) {
    return this.http.post(environment.jobService + this.jobs.job.educationAdd + `${jobId}?educationalQualifications=${Education}`, { educationalQualification: Education })
  }
  //Add-keywords to the job
  addKeyWords(jobId: string, Keywords: string[]) {
    return this.http.post(environment.requirementService + this.jobs.job.keyWordsAdd + `${jobId}?mustHaveKeywords=${Keywords}`, Keywords)
  }

  //Add-Recruiter to the job
  addRecruiter(recruiterId: string, jobId: string) {
    const accountId=localStorage.getItem('accountId')
    return this.http.post(environment.requirementService + this.jobs.job.recruiterAdd + `${jobId}/${accountId}/${recruiterId}/`, recruiterId)
  }
  //Remove-keywords to the job
  removeKeyWord(jobId: string, Keyword: string) {
    return this.http.put(environment.jobService + this.jobs.job.keywordRemove + `${jobId}`, { keyword: Keyword }, { responseType: 'text' })
  }

  //Remove-Perk to the job
  removePerk(jobId: string, perk: string) {
    return this.http.delete(environment.jobService + this.jobs.job.perkRemove + `${jobId}/${perk}`,  { responseType: 'text' })
  }

  //Remove-Perk to the job
  removeEducation(jobId: string, education: string) {
    return this.http.delete(environment.jobService + this.jobs.job.educationRemove + `${jobId}/${education}`, { responseType: 'text' })
  }

  //Remove-Location to the job
  removeLocation(jobId: string, education: string) {
    return this.http.delete(environment.jobService + this.jobs.job.locationRemove + `${jobId}/${education}`,  { responseType: 'text' })
  }

  //Remove-Recruiter to the job
  removeRecruiter(jobId: string, recruiterId: string) {
    return this.http.delete(environment.requirementService + this.jobs.job.recruiterRemove + `${jobId}/${recruiterId}/`)
  }

  changeJobStatus(jobId: string,status:string,reason:string,comment:string){
    let data = {
      remarkStatus:status,
      comments:comment,
      reasons:reason
    }
    return this.http.post<any>(environment.requirementService +this.jobs.updateJobStatus+ `${jobId}`,data)
    .pipe(map((res: any) => {

      return res;
    }

    ))
  }
  addRemark(jobId: string,accountId:string,data:any){
    return this.http.post<any>(environment.jobService +this.jobs.addRemark+ `${jobId}/${accountId}`,data)
    .pipe(map((res: any) => {

      return res;
    }

    ))
  }

  postJob(jobId:string,jobDetails:JobDetails){


    return this.http.post<any>(environment.requirementService + this.jobs.updateJob+`${jobId}`, jobDetails)
      .pipe(map((res: any) => {
        return res;
      }))
  
  }

  //publish Notification to candidate when he selected
  jobpublish(JobId: string) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/requirement/publish/${JobId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

   //edit Notification to candidate when he selected

   jobedit(JobId: string, accountId: any) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/requirement/edited/${JobId}/${accountId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }
   //post Notification to candidate when he selected

   jobposted(JobId: string) {
    const data = {
      title: 'JOBCHECK',
      message: '',
      topic: '',
      token: ''
    }
    return this.http.post(environment.pushnotificationUrl + `notification/requirement/post/${JobId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))

    }
    

}
