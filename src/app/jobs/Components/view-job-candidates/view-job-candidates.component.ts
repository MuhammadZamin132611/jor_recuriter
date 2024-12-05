import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobsService } from '../../Services/jobs.service';
import { JobOverviewService } from '../../Services/job-overview.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { ViewJobComponent } from '../view-job/view-job.component';
import { CandidateService } from 'src/app/candidates/Services/candidate.service';
import { resumeBuilder } from '../../../shared/resume.builder';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-job-candidates',
  templateUrl: './view-job-candidates.component.html',
  styleUrls: ['./view-job-candidates.component.scss']
})
export class ViewJobCandidatesComponent implements OnInit {


  name = 'Angular';
  show = false;
  profileId: any;
  profileID: any;

  clickit($event: { stopPropagation: () => void; }) {
    $event.stopPropagation();
    this.show = !this.show;
  }

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.show = false;
  }
  showBulk(value: boolean) {
    this.SMS = value;
    this.mailMessage = true;
    this.bulks = true;
  }

  
  loader= true;
  totalcount= 5;
  displayedColumns: string[] = ['name', 'status','candidatedetails','comment','recruiter','email','open'];
  datass=[]
  bulkAction: boolean = false;
  // displayedColumns: string[] = ['name', 'status', 'candidatedetails', 'comment', 'recruiter', 'email', 'open'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  candidatesList: any;
  @ViewChild(MatSort)
  sort!: MatSort;
  jobId: string = '';
  eyepopp: boolean = false;
  value: string = '';
  comment: string = '';
  submitted: boolean = false;
  candidateStatus!: FormGroup
  statusChangeModel: boolean = false;
  candidateReasons$: Observable<Array<string>> = of([])
  status: string = '';
  Candid: string = '';
  phoneNumber: string = '';
  data: string = '';
  height:number=0
  pageSize:number=3;
  bulkChecked:boolean=false;
  constructor(private jobService: JobOverviewService, private router: ActivatedRoute, private master: MasterdataService, private Job: ViewJobComponent,private candidateService: CandidateService,private resumeBuilder: resumeBuilder,private http: HttpClient) {
    this.candidateReasons$ = this.master.candidateReasons$
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {

      this.jobId = params.jobId
    })
    this.candidateStatus = new FormGroup({
      status: new FormControl('', Validators.required),
      reason: new FormControl([], Validators.required),
      comment: new FormControl()
    })
    this.getCandidates();
    this.height=window.innerHeight-360
    if(window.innerHeight < 700){
      this.pageSize=3;
    }else if (window.innerHeight>700 &&window.innerHeight<999){
      this.pageSize=4;

    }else {
      this.pageSize=10;

    }
  }


  bulkNewTab(){
    console.log(this.selectedCandidates)
  }

  open(id: string) {
    window.open('../../candidate/overview?id=' + id, '_blank');
  }
  openCandidateProfile() {
    for (let candidate of this.selectedCandidates) {
      window.open('../../candidate/overview?id=' + candidate.profileId, '_blank');
    }
    this.bulkAction = !this.bulkAction;
  }
  mailMessage: boolean = false;
  email: string = '';
  numb: number = 0;
  bulks: boolean = false;
  SMS: boolean = false;
  emailPop(data: any) {
    this.mailMessage = true;
    this.email = data.email;
    this.numb = data.mobileNumber;
    this.bulks = false;
    this.SMS = false;
  }
  childMessage(event: boolean) {
    this.mailMessage = event;
  }
  removedCandidates(e: any) {
    this.removeCandidates(e)
  }
  selectedCandidates:any=[]
  removeCandidates(data: any) {
    const indexs = this.selectedCandidates.indexOf(data);
    this.selectedCandidates[indexs].checked = !this.selectedCandidates[indexs].checked;
    this.selectedCandidates = this.selectedCandidates.filter((s: any) => s != data)
  }

  onResize(e:any){
    console.log(window.innerHeight)
    this.height=window.innerHeight-360
    if(window.innerHeight < 700){
      this.pageSize=3;
    }else if (window.innerHeight>700 &&window.innerHeight<999){
      this.pageSize=4;

    }else {
      this.pageSize=10;

    }

  }

  getCandidates() {
    this.jobService.getcandidates(this.jobId).subscribe((res:any) => {
      this.candidatesList = res.map((res:any)=>{
        return {
          ...res,
          checked:false,
          fullName:res.name,
          mobileNumber:res.phoneNumber

        }
      });
      console.log(this.candidatesList)
      this.loader=false;
      this.dataSource = new MatTableDataSource(this.candidatesList);
      this.dataSource.paginator = this.paginator;
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get f(): any { return this.candidateStatus['controls'] }


  selectstatus(e: any) {
    this.value = e.target.value;
  }
  eyepop() {
    this.eyepopp = !this.eyepopp;
  }
  ChangeStatus(value: any) {
    console.log(value)
    // if(this.BasicDetail.status!='ACTIVE'){
    this.statusChangeModel = true;
    //  this.statusVisible=true;
    //  this.openActivePop=true;
    // }else{
    this.candidateStatus.controls['status'].setValue("")
    this.status = value.status;
    console.log(this.status)
    this.Candid = value.profileId;
    this.phoneNumber = value.candidatePhoneNumber;
    //  this.Closesourced = true;

    // }

  }
  ReqMan: any;
  changeReqStatus() {
    this.ReqMan = localStorage.getItem('accountId')
    this.submitted = true;
    // console.log(this.reasons)
    if (this.candidateStatus.invalid) {
      return
    }
    else {
      this.jobService.ChangeStatuscandidate(this.Candid, this.jobId, this.ReqMan, this.candidateStatus.value.status, this.candidateStatus.value.reason, this.candidateStatus.value.comment)
        .subscribe((value) => {
          console.log(value);
          console.log("shortlisted")

              if (this.candidateStatus.value.status == "SHORTLISTED") {
                this.Shortlistedpushnotification();
              }
              else if (this.candidateStatus.value.status == "OFFERED") {
                this.Offeredpushnotification();

              }
          this.Job.getOffered();
          this.Job.getShortlisted();
          this.Job.getRejected();
          this.Job.getApllied();

          this.getCandidates();

          this.Sourced();
        });
    }
    // window.location.reload();

  }

   //Notification for Shortlisted

   Shortlistedpushnotification() {
    this.jobService.ShortlistedNotification(this.jobId, this.Candid).subscribe(data => {
      console.log("Shortlisted notification")
      this.SMSshortlisted();
    });
  }

  //SMS notification for shortlisted

  SMSshortlisted(){

    this.jobService.ShortlistedSMS(this.data, this.phoneNumber,this.Candid,this.phoneNumber).subscribe(data => {
      console.log("Shortlisted SMS notification")
    });

  }


  //Notification for Offered

  Offeredpushnotification() {
    // this.RequirementId = sessionStorage.getItem("RequirementId");
    this.jobService.OfferedNotification(this.jobId, this.Candid).subscribe(data => {
      console.log("Offered notification")
    });
    this.SMSoffered();
  }

     //SMS notification for offered

     SMSoffered(){
      this.jobService.SourcedSMS(this.data, this.phoneNumber,this.Candid,this.phoneNumber).subscribe(data => {
        console.log("sourced SMS notification")
      });
  
    }

    
  // Getreasons() {
  //   this.jobService.Getcandidatereason()
  //     .subscribe((data: any) => {
  //       this.candidatereasonList = data;
  //       console.log(data);
  //     })
  // }
  Sourced() {

    this.comment = '';
    this.submitted = false;
    this.candidateStatus.reset();
    this.statusChangeModel = !this.statusChangeModel;

  }

  
  filtertext(data: any) {
    console.log(data.value)
    if (data.value == 'ALL') {
      this.dataSource = new MatTableDataSource(this.candidatesList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource = new MatTableDataSource(this.candidatesList.filter((user: any) => user.status === data.value));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
  requirementsFilter(e: any) {
    console.log(e.target.value)

    this.dataSource = new MatTableDataSource(this.candidatesList.filter((user: any) => user.name.toLowerCase().includes(e.target.value.toLowerCase())));

    this.dataSource.paginator = this.paginator;

    // console.log(this.candidatesList)
  }
  shareCandidate(id: any) {
    const formDtaa = { text: 'check the below candidate details\n\n', url: 'https://recruitersapp.dev.jobcheck.in/candidate-details?id=' + id, title: 'Candidate details ', }

    navigator
      .share({
        ...formDtaa
      })
      .then(() => console.log("Share was successful."))
      .catch((error: DOMException) =>
        alert(
          `Sharing failed! Code: ${error.code} | Name: ${error.message
          } | Message: ${error.message}`
        )
      );
  }
  checkedIds: { id: string , text:string , url:string ,Name:string }[] = [];
  bulkShareJobDetails() {
    const shareItems = {
      text: this.checkedIds.map((item) => {
        return `
          
          Candidate Text: ${item.text}
          Candidate Title: ${item.Name}
          Candidate ID: ${item.id}
          Candidate URL: ${item.url}
          
        `
      }).join('\n\n')
    };
  
    navigator.share(shareItems)
      .then(() => console.log("Share was successful."))
      .catch((error: DOMException) =>
        alert(
          `Sharing failed! Code: ${error.code} | Name: ${error.message} | Message: ${error.message}`
        )
      );
  }
  downloadresume:Boolean = false;
  candidateDetails: any;
  candidateAction: boolean = false;
  resumePop: boolean = false;
  downloadAllResume() {
    for (let Candidate of this.candidatesResumeList) {
      this.candidateService.downloadResume(Candidate.profileId).subscribe((res) => {
        console.log(res);
        let blob = new Blob([res], { type: 'application/pdf' });
        let downloadURL = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = Candidate.fullName + ' ' + 'Resume';
        link.click();
      })
    }
    for (let candidate of this.candidatesNotResume) {
      this.candidateService.getFullDetails(candidate.profileId).subscribe(res => {
        console.log(res)
        this.candidateDetails = res;
        this.resumeBuilder.getProfile(this.candidateDetails)
      })
    }
    this.resumePop = !this.resumePop

  }

  candidatesResumeList: any[] = [];
  candidatesNotResume: any[] = [];
  signleResume: boolean = false;
  getAllResume() {
    this.candidatesResumeList = [];
    this.candidatesNotResume = [];
    for (let candidate of this.selectedCandidates) {
      this.candidateService.getResume(candidate.profileId).subscribe((res: any) => {
        console.log(res)
        if (res != null && res != '') {
          this.candidatesResumeList.push({ ...candidate, resume: res.value })
          console.log(this.candidatesResumeList)
        }
        if (this.selectedCandidates.length == this.candidatesResumeList.length) {
          this.downloadAllResume()
        }

        this.candidatesNotResume = this.filterByReference(this.selectedCandidates, this.candidatesResumeList)
        if (this.candidatesNotResume.length != 0) {
          this.resumePop = true;
          this.candidateAction = true;
        }
      })

    }

    // this.candidatesNotResume = this.filterByReference(this.selectedCandidates, this.candidatesResumeList)
    console.log('reyrtuty', this.candidatesNotResume)

  }
filterByReference = (arr1: any[], arr2: any[]) => {
  let res = [];
  res = arr1.filter(el => {
    return !arr2.find(element => {
      return element.profileId === el.profileId;
    });
  });
  return res;
}
candidateId: string = '';
  openResumeModel(){
  
    this.candidateService.getResume(this.candidateId).subscribe((res:any) =>
      {console.log(res) 
      if(res !=null){
        const pdfUrl = `https://job-check.s3.ap-south-1.amazonaws.com/${res.value}`; // Replace with the actual URL of the PDF file
         const filename =res.value; // Replace with your desired filename // Fetch the PDF file from the URL
          this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => { // Save the file using FileSaver.js
             saveAs(blob, filename); },); 
  console.log(res.value)
      }
      else(this.downloadresume=true)
      }
      )
  }

  selectCandidates(e: any, i: any){
    const index = this.candidatesList.indexOf(i)
    this.candidatesList[index].checked = !this.candidatesList[index].checked;
    console.log(this.candidatesList[index])
    if (e.target.checked) {
      this.selectedCandidates.push(i)
      console.log(this.selectedCandidates)
    } else {
      const indexs = this.selectedCandidates.indexOf(i)
      this.selectedCandidates.splice(indexs, 1)
      console.log(this.selectedCandidates)

    }

   
  }
  bulkSelectCandidates(e: any){
    if (e.target.checked == true) {
      for (let i of this.candidatesList) {
        i.checked = true;
      }

      this.selectedCandidates=[...this.candidatesList]
    
  }else{
    for (let i of this.candidatesList) {
      i.checked = false;

    }
    this.selectedCandidates = []; 
  }
}
}
