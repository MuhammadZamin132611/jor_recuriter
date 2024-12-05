import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobDetails } from '../../Models/job.model';
import { JobsService } from '../../Services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-view-job-actions',
  templateUrl: './view-job-actions.component.html',
  styleUrls: ['./view-job-actions.component.scss']
})
export class ViewJobActionsComponent implements OnInit {
  @Input()
  openDelete: boolean = false;
  @Input()
  updatePop: boolean = false;
  @Input()
  jobId: string = '';
  @Output() deletePop = new EventEmitter<boolean>();
  AssignRecruitersLists:any=[]

  formDtaa!: FormData;
  recruitersLists: Array<string> = [];
  @Input()
  jobDetails: JobDetails = new JobDetails();
  selectedRecruiters: Array<any> = []
   constructor(private jobService: JobsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (!this.openDelete && !this.updatePop) {
      this.shareDetasils()
    }
    this.getRecruiters();
    this.getAssignrecruiter();
  }

  closeDelete() {
    this.deletePop.emit(false)
  }

  deleteJob() {
    console.log(this.jobId)
    this.jobService.deleteJob(this.jobId).subscribe(res => {
      console.log(res);
      this.deletePop.emit(false)
      this.router.navigate(['view-all-jobs'], { relativeTo: this.route.parent })
    })
  }

  // Share the job Method
  shareDetasils() {
    this.jobService.getJobDetails(this.jobId).subscribe((data: any) => {
      navigator
        .share({
          title: 'Check Out the Job',
          text: `
          Job Title: ${data.jobTitle}
        `,
          url: window.location.origin+'/jobs/view-job/overview?jobId='+data.requirementId
        })
        .then(() => {
          console.log("Share was successful.")
          this.deletePop.emit(false)
        })
        .catch((error: DOMException) =>
          alert(
            `Sharing failed! Code: ${error.code} | Name: ${error.message
            } | Message: ${error.message}`
          )
        );

    });
  }

  //To get all the recruiters linked with RecruiterManager
  getRecruiters() {
    const data = JSON.parse(JSON.stringify(localStorage.getItem('accountId')))
    this.jobService.getRecruitersAccount(data).subscribe((res: any) => {
      console.log(res)
      this.recruitersLists = res;
      this.getAssignrecruiter();
    })
  }

  //To set the Values in the form from api requirement-details
  getAssignrecruiter() {
    this.jobService.getAssignrecruiter(this.jobId).subscribe(res => {
      console.log(res);
      this.AssignRecruitersLists = res;
      console.log(this.AssignRecruitersLists);
      const filterByReference = (arr1: any[], arr2: any[]) => {
        let res = [];
        res = arr1.filter(el => {
          return !arr2.find(element => {
            return element.recruiterId === el.userId;
          });
        });
        return res;
      }
    
      this.recruitersLists = filterByReference(this.recruitersLists, this.AssignRecruitersLists.filter((result:any)=>result.recruiterId!==localStorage.getItem('accountId')!))
    })
  }
  updateteam() {
    for (let recruiter of this.selectedRecruiters) {
      this.jobService.addRecruiter(recruiter.userId, this.jobId).subscribe(res => {
        
      })
    }
    this.deletePop.emit(false)

  }
  hello(e:any){
    console.log(e)
  }
  removeRecruiter(e: string) {
    this.jobService.removeRecruiter(this.jobId, e).subscribe(res => {
      console.log(res)
      this.getRecruiters()
    })
  }
}
