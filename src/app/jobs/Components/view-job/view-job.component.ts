import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../Services/jobs.service';
import { JobDetails } from '../../Models/job.model';
import { JobOverviewService } from '../../Services/job-overview.service';
import { Candidates } from '../../Models/candidates.model';
import { Observable, map, of } from 'rxjs';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {



  name = 'Angular';
  show = false;

  clickit($event: { stopPropagation: () => void; }) {

    this.show = !this.show;
    if (true) {
      $event.stopPropagation();

    }


  }

  @HostListener('document:click', ['$event']) onDocumentClick() {
    if (this.show) {
      this.show = false;
    }
  }


  jobId: string = '';
  jobDetails: JobDetails = new JobDetails();
  moreAction: boolean = false;
  candidates: Candidates = new Candidates();
  show_Overview: boolean = true;
  show_Candidate: boolean = false;
  show_Details: boolean = false;
  openPostPop: boolean = false;
  deleteJob: boolean = false;
  actionPop: boolean = false;
  remarkspop: boolean = false;
  selectedskills: Array<string> = [];
  skillList$: Observable<Array<string>> = of([])
  openTagPop: boolean = false;
  updatePop: boolean = false;
  postedDate:any;
  date1:any;
  constructor(private router: ActivatedRoute, private jobService: JobsService, private jobsOverview: JobOverviewService, private master: MasterdataService,private datePipe: DatePipe) {
    this.skillList$ = this.master.skillList$

  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.jobId = params.jobId
    })
    console.log(this.router.children[0].snapshot.routeConfig?.path)
    if (this.router.children[0].snapshot.routeConfig?.path == 'overview') {
      this.showOverview()
    } else if (this.router.children[0].snapshot.routeConfig?.path == 'candidates-details') {
      this.showCandidate()
    } else {
      this.showDetails()
    }
    this.getJobDetails();
    this.getApllied();
    this.getSourced();
    this.getShortlisted();
    this.getOffered();
    this.getRejected();
  }

  changeCTC(value: number) {
    let number;
    if (value % 10000 != 0) {
      number = Math.floor(value / 100000)
      return number
    }
    number = value / 100000
    return number

  }
  //notification message for post

  postNotification() {
    this.jobService.jobposted(this.jobId).subscribe(data => {
      console.log("posted notification")
    });

  }

  getJobDetails() {
    this.jobService.getJobDetails(this.jobId).subscribe(res => {
      console.log(res);
      this.jobDetails = res;

      this.jobDetails.salary.minAnnualCTC = (this.changeCTC(this.jobDetails.salary.minAnnualCTC))
      this.jobDetails.salary.maxAnnualCTC = this.changeCTC(this.jobDetails.salary.maxAnnualCTC)
      this.selectedskills = this.jobDetails.musthavekeywords
      this.date1=this.jobDetails.postedDate;
      this.postedDate=this.datePipe.transform(this.date1, 'dd MMM yyyy'); 
      console.log("date",this.postedDate)
      console.log(this.jobDetails)
    })
  }

  getApllied() {
    this.jobsOverview.getApplied(this.jobId).subscribe((res: any) => {
      console.log(res)
      this.candidates.applied = res.count;
    })
  }
  getSourced() {
    this.jobsOverview.GetSourced(this.jobId).subscribe((res: any) => {
      console.log(res)
      this.candidates.sourced = res.count;

    })
  }
  getShortlisted() {
    this.jobsOverview.GetShortlisted(this.jobId).subscribe((res: any) => {
      console.log(res)
      this.candidates.shortlisted = res.count;

    })
  }
  getOffered() {
    this.jobsOverview.GetOffered(this.jobId).subscribe((res: any) => {
      console.log(res)
      this.candidates.offered = res.count;

    })
  }
  getRejected() {
    this.jobsOverview.GetRejected(this.jobId).subscribe((res: any) => {
      console.log(res)
      this.candidates.rejected = res.count;

    })
  }
  showOverview() {
    this.show_Overview = true;
    this.show_Candidate = false;
    this.show_Details = false;
  }
  showCandidate() {
    this.show_Overview = false;
    this.show_Candidate = true;
    this.show_Details = false;
  }

  showDetails() {
    this.show_Overview = false;
    this.show_Candidate = false;
    this.show_Details = true;
  }
  //Post as job post Api
  PostJob() {
    const accountId = localStorage.getItem('accountId')!
    this.jobDetails.statusType = 'JOBPOST'
    this.jobService.updateJob(this.jobId, accountId, this.jobDetails).subscribe((data: any) => {
      console.log(data);
      this.getJobDetails();
      this.postNotification();
      this.openPostPop = !this.openPostPop;
    })

  }

  closeDeletePop(e: boolean) {
    this.deleteJob = e;
    this.actionPop = e;
    this.getJobDetails()

  }

  requirementStatus(e: boolean) {
    this.remarkspop = e;
    this.getJobDetails()
  }

  arrayCompare(_arr1: any, _arr2: any) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      || _arr1.length !== _arr2.length
    ) {
      return false;
    }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }
  addTags() {
    if (!this.arrayCompare(this.jobDetails.musthavekeywords, this.selectedskills)) {
      const keywords = this.selectedskills.filter(word => !this.jobDetails.musthavekeywords.includes(word))
      this.jobService.addKeyWords(this.jobId, keywords).subscribe(res => {
        console.log(res)
        this.getJobDetails();
        this.openTagPop = !this.openTagPop;
      })

    }
  }
  //To remove the keyword from the job
  removeKeyword(e: any) {
    this.jobService.removeKeyWord(this.jobId, e.value).subscribe(res => console.log(res))
  }

  openUpdateTeam() {
    this.actionPop = true;
    this.updatePop = true
  }
}
