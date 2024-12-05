import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../Services/jobs.service';
import { JobDetails } from '../../Models/job.model';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.scss']
})
export class ViewJobDetailsComponent implements OnInit {
  jobId:string='';
  jobDetails:JobDetails=new JobDetails();
  height:number=0;
  basic:boolean=false;
  job:boolean=false;
  candidate:boolean=false;
  additional:boolean=false;
  questionnare:boolean=false;
  minimumSalary:string='';
  maximumSalary:string='';
  constructor(private router: ActivatedRoute,private jobService: JobsService) { 
    this.router.queryParams.subscribe((params: any) => {
    
      this.jobId = params.jobId
    })
  }

  ngOnInit(): void {
    this.jobService.getJobDetails(this.jobId).subscribe(res => {
      console.log(res);
      this.jobDetails = res;
      this.minimumSalary=new Intl.NumberFormat("en-IN").format(res.salary.minAnnualCTC)
      this.maximumSalary=new Intl.NumberFormat("en-IN").format(res.salary.maxAnnualCTC)
      this.height=window.innerHeight-360
    })
  }
  onResize(e:any){
    this.height=window.innerHeight-360

  }
  basics(){
    this.basic=true;
    this.job=false;
    this.candidate=false;
    this.additional=false;
    this.questionnare=false;
  }
  jobs(){
    this.basic=false;
    this.job=true;
    this.candidate=false;
    this.additional=false;
    this.questionnare=false;
  }
  candidates(){
    this.basic=false;
    this.job=false;
    this.candidate=true;
    this.additional=false;
    this.questionnare=false;
  }
  additionals(){
    this.basic=false;
    this.job=false;
    this.candidate=false;
    this.additional=true;
    this.questionnare=false;
  }
  questionnares(){
    this.basic=false;
    this.job=false;
    this.candidate=false;
    this.additional=false;
    this.questionnare=true;
  }
}
