import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidateService } from 'src/app/candidates/Services/candidate.service';
import { resumeBuilder } from '../../resume.builder';
import { ViewJobComponent } from 'src/app/jobs/Components/view-job/view-job.component';
import { JobsService } from 'src/app/jobs/Services/jobs.service';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-edit-job-status',
  templateUrl: './edit-job-status.component.html',
  styleUrls: ['./edit-job-status.component.scss']
})
export class EditJobStatusComponent implements OnInit {
  @Input()
  openResumeModel: boolean = false;
  @Output() closeMdoel = new EventEmitter<boolean>();
  @Input()
  candidatesNotResume: Array<any> = []
  @Input()
  signleResume: boolean = false;
  @Input()
  candidateId: string = '';
  candidateDetails: any;
  @Input()
  candidatesResumeList: Array<any> = []
  @Input()
  reportCandidate: boolean = false;
  @Input()
  reportCandidateDetails: any = {}
  @Input()
  Closesourced: boolean = false;
  activeRequirements: any[] = [];
  @Input()
  profileId: any;
  @Input() sourcePath: any
  @Input() jobId: any;
  constructor(private candidateService: CandidateService, private resumeBuilder: resumeBuilder, private job: ViewJobComponent, private recruterService: JobsService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.sourcePath)
    this.getActiveReq()
  }

  getActiveReq() {

    this.recruterService.getTotalRequirements('').subscribe((res: any) => {
      this.activeRequirements = res.filter((el: any) => {
        if (el.remarkStatus == 'ACTIVE') {
          if (el.requirementId == this.jobId) {
            this.activeRequSelect.push(el.requirementId)

          }
          return el
        }

      })
    })

  }


  sourceAllrequirements() {
    for (let jobId of this.activeRequSelect) {
      this.sourceCandidate(jobId)
    }
    this.Sourced();
  }

  //Source the candidate to the requirements 
  sourceCandidate(jobId: any) {
    const accountId = localStorage.getItem("accountId");
    this.candidateService.sourceCandidate(this.profileId, jobId, accountId, this.sourcePath).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err)
      })

    ).subscribe(res => {
      console.log(res);
      this.job.getSourced();
    })
  }

  Sourced() {
    this.Closesourced = !this.Closesourced;
    this.activeRequSelect = [];
    this.closeModel()
  }


  activeRequSelect: any = []
  selectActivereq(event: any, e: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.activeRequSelect.push(e)
    } else {
      const index = this.activeRequSelect.indexOf(e)
      this.activeRequSelect = this.activeRequSelect.splice(index, 0)
    }
    console.log(this.activeRequSelect);
  }

  downloadResume(profile: any) {
    // this.candidateService.getResume(profile.profileId).subscribe((res)=>{
    //   resume=res;
    // })
    this.candidateService.downloadResume(profile.profileId).subscribe((res) => {
      console.log(res);
      let blob = new Blob([res], { type: 'application/pdf' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = profile.fullName + ' ' + 'Resume';
      link.click();
    }, err => {
      console.log(err);
      this.openResumeModel = !this.openResumeModel

      this.candidateId = profile.profileId
    })
  }

  closeModel() {
    this.openResumeModel = false;
    this.closeMdoel.emit(false)
  }
  getFullDetails(data: string) {
    this.candidateService.getFullDetails(data).subscribe(res => {
      console.log(res)
      this.candidateDetails = res;
      this.resumeBuilder.getProfile(this.candidateDetails)
      this.openResumeModel = !this.openResumeModel
      this.closeMdoel.emit(this.openResumeModel)

    })
  }
  downloadAllResume() {
    for (let Candidate of this.candidatesResumeList) {

      const pdfUrl = `https://job-check.s3.ap-south-1.amazonaws.com/${Candidate.resume}`; // Replace with the actual URL of the PDF file
      const filename = Candidate.resume; // Replace with your desired filename // Fetch the PDF file from the URL
      this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => { // Save the file using FileSaver.js
        saveAs(blob, filename);
      },);

    }
    for (let candidate of this.candidatesNotResume) {
      this.candidateService.getFullDetails(candidate.profileId).subscribe(res => {
        console.log(res)
        this.candidateDetails = res;
        this.resumeBuilder.getProfile(this.candidateDetails)
      })
    }
    this.openResumeModel = !this.openResumeModel
    this.closeMdoel.emit(this.openResumeModel)

  }
}
