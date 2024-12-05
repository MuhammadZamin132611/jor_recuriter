import { Component, OnInit } from '@angular/core';
import { JobOverviewService } from '../../Services/job-overview.service';
import { ActivatedRoute } from '@angular/router';
// import { CandidateDetails } from 'src/app/shared/Models/candidates.model';
import { JobsService } from '../../Services/jobs.service';
import { CandidateDetails } from 'src/app/candidates/Models/candidate.model';

@Component({
  selector: 'app-view-job-overview',
  templateUrl: './view-job-overview.component.html',
  styleUrls: ['./view-job-overview.component.scss']
})
export class ViewJobOverviewComponent implements OnInit {
  jobId:string='';
  profileId: any;
  phoneNumber: string = '';
  data: string = '';
  candidatesList:any=[];
  constructor(private jobs:JobOverviewService,private router: ActivatedRoute,private jobsService:JobsService ) {
    this.router.queryParams.subscribe((params: any) => {
      this.jobId = params.jobId
    })
   }

  ngOnInit(): void {
    let date1, date2,date3;
 
    this.jobs.getCandidatesOfJob(this.jobId).subscribe((res:any)=>{
  
      this.candidatesList=res.map((res:any)=>{
        date2 = new Date(); 
        date1 = new Date(res.lastSeen); 
        date3=new Date(res.lastUpdated);
        let time_difference = date2.getTime() - date1.getTime();
        let update_difference=date2.getTime() - date3.getTime();
        let days_difference = Math.round(update_difference / (1000 * 60 * 60 * 24));
        let update_days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24));
        // let active = Math.round(time_difference / (1000 * 60 * 60 * 24));
        return {
          
          ...res,
          fullName:res.name,
          mobileNumber:res.phoneNumber,
          active:days_difference,
          update:update_days_difference,
          checked:false
        }
      })
    })
  }

   //Notification for sourced

   Sourcedpushnotification(jobId:any) {
    this.jobs.SourcedNotification(jobId, this.profileId).subscribe(res => {
      console.log("Sourced Notification");
    });
    this.SMSSourced();
  }

    //SMS notification for shortlisted

    SMSSourced(){

      this.jobs.SourcedSMS(this.data, this.phoneNumber,this.phoneNumber,this.profileId).subscribe(data => {
        console.log("sourced SMS notification")
      });
  
    }


}
