import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MasterdataService } from '../../Services/masterdata.service';
import { CandidateDetails, candidatesOverview } from '../../Models/candidates.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CandidateService } from 'src/app/candidates/Services/candidate.service';
import { resumeBuilder } from '../../resume.builder';
import { ViewJobComponent } from 'src/app/jobs/Components/view-job/view-job.component';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit {
  [x: string]: any;



  name = 'Angular';
  show = false;

  clickit($event: { stopPropagation: () => void; }) {
    $event.stopPropagation();
    this.show = !this.show;
  }

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.show = false;
  }

  candidateAction: boolean = false;
  maxSelectionLimit: number = 10;
  reportCandidateDetails: any = {}
  canvasFilter: boolean = false;
  @Input()
  candidatesList: Array<candidatesOverview> = new Array();
  @Input()
  filteredCandidates: Array<candidatesOverview> = new Array();
  loading: boolean = true;
  selectedCandidates: Array<candidatesOverview> = new Array();
  FilterForm!: FormGroup;
  minSalaryValue: number | null = null;
  maxSalaryValue: number | null = null;
  locations$: Observable<Array<string>> = of([]);
  roles$: Observable<Array<string>> = of([])
  industry$: Observable<Array<string>> = of([])
  EduacationalQualifications$: Observable<Array<string>> = of([])
  showNotice: boolean = false;
  showActive: boolean = false;
  bulkAction: boolean = false;
  reportCandidate: boolean = false;
  candidateName: string = '';
  checks: boolean = false;
  selectedLocation: Array<string> = [];
  selectedInd: Array<string> = [];
  selectedRole: Array<string> = [];
  selectedEdu: Array<string> = [];
  count: number = 0;
  currentRoute: string = '';
  height: number = 0
  filterShow: boolean = false;
  resumePop: boolean = false;
  Closesourced: boolean = false;
  candidatesResumeList: any[] = [];
  candidatesNotResume: any[] = [];
  candidateId: string = '';
  signleResume: boolean = false
  data: any;
  jobId: any;
  sourcePath: any
  percentageFilter = 'ALL'
  constructor(private router: Router, private master: MasterdataService, private fb: FormBuilder, private route: ActivatedRoute, private candidateService: CandidateService, private resumeBuilder: resumeBuilder, private job: ViewJobComponent,private http: HttpClient) {
    this.locations$ = this.master.loactions$
    this.industry$ = this.master.indusrys$
    this.roles$ = this.master.roles$
    this.EduacationalQualifications$ = this.master.HighestQualification$

  }



  openNewTab() {
    this.selectedCandidates.map(el => {
      this.open(el.profileId)
    })
  }



  Allcandidate: any[] = []
  filter(filt: string) {
    this.cancelFilter()
    if (filt == '90+')
      this.candidatesList = this.candidatesList.filter((el: any) => {
        if (el.matchingPercentage > 90)
          return el

      })
    if (filt == '75+')
      this.candidatesList = this.candidatesList.filter((el: any) => {
        if (el.matchingPercentage > 75)
          return el
      })
    if (filt == '75-')
      this.candidatesList = this.candidatesList.filter((el: any) => {
        if (el.matchingPercentage < 75)
          return el
      })
  }


  onResize(e: any) {
    // this.height = window.innerHeight - 360
    // console.log(window.innerHeight)
  }
  ngOnInit(): void {

    if (location.pathname.includes('/profilesearch'))
      this.sourcePath = 'SEARCHPROFILES'
    else
      this.sourcePath = 'CANDIDATESOVERVIEW'

    this.router.events.subscribe((event: any) => {
      // Handle navigation end event
      // console.log('hello')
      // console.log('Navigation ended:', event);
      // You can access event.url to get the URL of the navigation end
    });


    this.route.queryParams.subscribe((re: any) => {
      this.jobId = re.jobId
    })
    this.route.pathFromRoot[1].url.subscribe(val => {
      this.currentRoute = val[0].path
      console.log(this.currentRoute)
    }
    );
    this.height = window.innerHeight - 360

    this.FilterForm = this.fb.group({
      minSalary: '',
      maxSalary: '',
      minimum: new FormControl(),
      maximum: new FormControl(),
      noticePeriod: new FormControl(),
      activity: new FormControl(),
      // location: new FormControl([]),
      // roles: new FormControl([]),
      // industry: new FormControl([]),
      // education: new FormControl([]),

    })
    if (this.loading && this.candidatesList.length == 0) {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
    }
    
  }

  changeToCurrency(field: string) {
    const value = this.FilterForm.get(field)?.value;
    const numericValue = parseFloat(value.replace(/,/g, ''));
    const formattedValue = new Intl.NumberFormat('en-IN').format(numericValue);
    this.FilterForm.get(field)?.setValue(formattedValue);

    if (field === 'minSalary') {
      this.minSalaryValue = numericValue;
    } else if (field === 'maxSalary') {
      this.maxSalaryValue = numericValue;
    }

  }
  calculateDaysAgo(lastSeenDate: string): string {
    const lastSeen = new Date(lastSeenDate);
    const today = new Date();

    const timeDifference = today.getTime() - lastSeen.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      // If it's the same day, show as "today"
      return "today";
    } else if (daysDifference === 1) {
      // If it's yesterday, show as "yesterday"
      return "yesterday";
    } else if (daysDifference < 7) {
      // If within the last week, show in "X days ago" format
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference < 31) {
      // If within the last month, show in "X weeks ago" format
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
    } else {
      // For durations exceeding 31 days, show in "X months ago" format
      const monthsDifference = Math.floor(daysDifference / 30); // Approximating 30 days in a month
      return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    }
  }
  

  open(id: string) {
    window.open('../../candidate/overview?id=' + id, '_blank');
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
  removeCandidates(data: any) {
    const indexs = this.selectedCandidates.indexOf(data);
    this.selectedCandidates[indexs].checked = !this.selectedCandidates[indexs].checked;
    this.selectedCandidates = this.selectedCandidates.filter((s: any) => s != data)
  }
  showBulk(value: boolean) {
    this.SMS = value;
    this.mailMessage = true;
    this.bulks = true;
  }
  reumlist: any = []


  slect(event: any, candidate: any, index: number) {

    if (event.target.checked) {

      if (this.selectedCandidates.length < this.maxSelectionLimit) {

        candidate.checked = true;

        this.selectedCandidates.push(candidate);



        // Add the candidate's details to the checkedIds array if not already present

        if (!this.checkedIds.some(item => item.id === candidate.profileId)) {

          this.checkedIds.push({

            text: 'Check the below candidate details',

            Name: candidate.fullName,

            id: candidate.profileId,

            url: `https://recruitersapp.dev.jobcheck.in/candidate-details?id=${candidate.profileId}`,

          });

        }

      } else {

        event.target.checked = false; // Prevent selection if the maximum limit is reached

      }

    } else {

      candidate.checked = false;

      const indexInSelected = this.selectedCandidates.indexOf(candidate);

      if (indexInSelected > -1) {

        this.selectedCandidates.splice(indexInSelected, 1);

      }



      // Remove the candidate's details from the checkedIds array

      this.checkedIds = this.checkedIds.filter((item) => item.id !== candidate.profileId);

    }

  }

  bulk(e: any) {

    const isChecked = e.target.checked;
    if (isChecked) {
      if (this.selectedCandidates.length < this.maxSelectionLimit) {
        this.selectedCandidates = [...this.candidatesList];
        this.checks = true;
      } else {
        e.target.checked = false; // Prevent selection if the maximum limit is reached
      }
    } else {
      this.selectedCandidates = [];
      this.checks = false;
    }
  }
  openCandidateProfile() {
    for (let candidate of this.selectedCandidates) {
      window.open('../../candidate/overview?id=' + candidate.profileId, '_blank');
    }
    this.bulkAction = !this.bulkAction;
  }

  Sourced(ProfileId: any) {
    this.profileId = ProfileId;
    this.Closesourced = !this.Closesourced;
    this.candidateAction = !this.candidateAction
    // console.log(this.Closesourced)
    this.activeRequirements = [];
    this.activeRequSelect = [];
  }
  activeRequirements: any;
  profileId: any;
  //get list of active requirements 
  getActiveRequirements(ProfileId: any) {
    const accountId = localStorage.getItem("accountId");
    this.profileId = ProfileId;
    this.candidateService.getActiveReq(accountId, ProfileId).subscribe(
      res => {
        console.log(res)
        this.activeRequirements = res;
        console.log(this.activeRequirements)
      }, (err) => {
        if (err.status == 500) {
          this.getActiveRequirements(this.profileId)
        }
      }
    )
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
  sourceAllrequirements() {
    const accountId = localStorage.getItem("accountId");

    for (let req of this.activeRequSelect) {
      this.sourceCandidate(req)
    }
    this.Sourced('');
  }
  //Source the candidate to the requirements 
  sourceCandidate(jobId: any) {
    const accountId = localStorage.getItem("accountId");

    this.candidateService.sourceCandidate(this.profileId, jobId, accountId, 'CANDIDATESOVERVIEW').subscribe(res => {
      console.log(res);
      this.job.getSourced();
    })
  }
  sourced: any;
  GetSourced() {
    this.candidateService.GetApisourced(this.data).subscribe((data: any) => {
      console.warn("data", data);
      this.sourced = data;
    });
  }

  filterSearch() {
    this.count = 0;
    const totalData = this.filteredCandidates;
    let data = this.filteredCandidates;
    console.log('first', this.FilterForm.value)
    if (this.FilterForm.value.salarymin != null || this.FilterForm.value.salarymax != null || this.FilterForm.value.minimum != null || this.FilterForm.value.maximum != null || this.FilterForm.value.noticePeriod != null || this.FilterForm.value.activity != null || this.selectedLocation.length > 0 || this.selectedRole.length > 0 || this.selectedInd.length > 0 || this.selectedEdu.length > 0) {
      this.selectedCandidates = [];
      if (this.FilterForm.value.salarymin != null && this.FilterForm.value.salarymax != null) {
        data = data.filter((e: any) => {
          return e.currentCTC >= this.FilterForm.value.salarymin && e.currentCTC <= this.FilterForm.value.salarymax
        })
        this.candidatesList = data;
        this.count = this.count + 1
        console.log('expe', data)
      } else if (this.FilterForm.value.salarymin != null && this.FilterForm.value.salarymax == null) {
        data = data.filter((e: any) => {
          return e.currentCTC >= this.FilterForm.value.salarymin
        })
        this.candidatesList = data;
        this.count = this.count + 1

      } else if (this.FilterForm.value.salarymin == null && this.FilterForm.value.salarymax != null) {
        data = data.filter((e: any) => {
          return e.currentCTC <= this.FilterForm.value.salarymax
        })
        this.candidatesList = data;
        this.count = this.count + 1

      }


      if (this.FilterForm.value.minimum != null && this.FilterForm.value.maximum != null) {
        data = data.filter((e: any) => {
          return e.totalWorkExperience >= this.FilterForm.value.minimum && e.totalWorkExperience <= this.FilterForm.value.maximum
        })
        this.candidatesList = data;
        this.count = this.count + 1

        console.log('salary', data)

      } else if (this.FilterForm.value.minimum != null && this.FilterForm.value.maximum == null) {
        data = data.filter((e: any) => {
          return e.totalWorkExperience >= this.FilterForm.value.minimum
        })
        this.candidatesList = data;
        this.count = this.count + 1

      } else if (this.FilterForm.value.minimum == null && this.FilterForm.value.maximum != null) {
        data = data.filter((e: any) => {
          return e.totalWorkExperience <= this.FilterForm.value.maximum
        })
        this.candidatesList = data;
        this.count = this.count + 1

      }


      if (this.FilterForm.value.noticePeriod != null) {
        if (this.FilterForm.value.noticePeriod == '15') {

          data = data.filter((e: any) => {
            return parseInt(e.noticePeriod) == 15
          })
          this.candidatesList = data;
          this.count = this.count + 1
        }
        if (this.FilterForm.value.noticePeriod != '15' && this.FilterForm.value.noticePeriod != '91') {


          data = data.filter((e: any) => {
            return parseInt(e.noticePeriod) <= parseInt(this.FilterForm.value.noticePeriod)
          })
          this.candidatesList = data;
          this.count = this.count + 1
        }
        if (this.FilterForm.value.noticePeriod == '91') {


          data = data.filter((e: any) => {
            return parseInt(e.noticePeriod) >= 91
          })
          this.candidatesList = data;
          this.count = this.count + 1
        }


      }

      if (this.FilterForm.value.activity != null) {
        if (this.FilterForm.value.activity != '31') {
          data = data.filter((e: any) => {
            return e.active <= this.FilterForm.value.activity
          })
          this.candidatesList = data;
          this.count = this.count + 1
        }
        if (this.FilterForm.value.activity == '31') {
          data = data.filter((e: any) => {
            return e.active >= 31
          })
          this.candidatesList = data;
          this.count = this.count + 1
        }


      }

      if (this.selectedLocation.length > 0) {
        data = data.filter((elem: any) => {
          return this.selectedLocation.find((el: any) =>
            elem.preferedLocations.some((e: any) => e.includes(el))
          )
        }
        )
        console.log(data)
        this.candidatesList = data;
        this.count = this.count + 1


      }


      if (this.selectedRole.length > 0) {
        data = data.filter((elem: any) => {
          return this.selectedRole.find((el: any) =>
            elem.jobRole.some((e: any) => e.includes(el))
          )

        }
        )
        this.candidatesList = data;
        this.count = this.count + 1
        // 
      }
      if (this.selectedInd.length > 0) {
        data = data.filter((elem: any) => {
          return this.selectedInd.find((el: any) =>
            elem.areaOfInterests.some((e: any) => e.includes(el))
          )

        }
        )
        this.candidatesList = data;
        this.count = this.count + 1


      }

      if (this.selectedEdu.length > 0) {
        data = data.filter((elem: any) => {
          return this.selectedEdu.find((el: any) =>
            elem.educationalQualifications.some((e: any) => e.includes(el))
          )

        }
        )
        this.candidatesList = data;
        this.count = this.count + 1

      }
    }

    else {
      this.candidatesList = totalData;
      this.count = 0;
    }
  }
  cancelFilter() {
    this.candidatesList = this.filteredCandidates;
    this.FilterForm.reset();
    this.selectedInd = []
    this.selectedRole = []
    this.selectedEdu = []
    this.selectedLocation = [];
    this.count = 0;
  }

  downloadResume(profile: any) {
    this.candidateService.getResume(profile.profileId).subscribe((res:any)=>{
      // resume=res;
     console.log(res)
      if(res !=null){
        const pdfUrl = `https://job-check.s3.ap-south-1.amazonaws.com/${res.value}`; 
         const filename =res.value; 
          this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => { 
             saveAs(blob, filename); },); 
  console.log(res.value)
      }
      else{
        this.resumePop = !this.resumePop
      this.candidateAction = !this.candidateAction

      this.candidateId = profile.profileId
      }
    })
    
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
  // reportCanndidate(data: any) {
  //   this.reportCandidate = !this.reportCandidate
  //   this.reportCandidateDetails = data
  //   this.candidateAction = !this.candidateAction
  // }


  downloadresume:Boolean = false;
  candidateDetails: any
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

  getFullDetails(data: string) {
    this.candidateService.getFullDetails(data).subscribe(res => {
      console.log(res)
      this.candidateDetails = res;
      this.resumeBuilder.getProfile(this.candidateDetails)
      this.resumePop = !this.resumePop
    })
  }
  closeModel(e: any) {
    this.resumePop = e;
    this.candidateAction = e;
    this.reportCandidate = e
    this.Closesourced = e;
  }
  reportCanndidate(data: any) {
    this.reportCandidate = !this.reportCandidate
    this.reportCandidateDetails = data
    this.candidateAction = !this.candidateAction
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

  CheckProfileBulkShare=(event:any)=>{
    console.log(event,"Event called");
    if(event.target.checked){
      console.log("Checked True");
      this.checkDetails();
    }else{
      console.log("Checked False");
      this.checkedIds = []
      // alert('Please Selet All profile');
    }
  }

  checkDetails = ()=>{
      console.log("called candite details")
      console.log(this.candidatesList,"Candidate list showing")
      if (this.candidatesList.length === 0) {
        this.checkedIds.push({
          id: 'nodata',
          text: 'No data',
          url: '',
          Name: ''
        });
      } else {
        this.checkedIds = this.candidatesList.map(candidate => {
          return {
            id: candidate.profileId,
            text: 'Candidate details are :-',
            url: `https://recruitersapp.dev.jobcheck.in/candidate-details?id=${candidate.profileId}`,
            Name: candidate.fullName
          };
        });
      }
    
      console.log(this.checkedIds);    
    }






  checkedIds: { id: string, text: string, url: string, Name: string }[] = [];
  bulkShareJobDetails() {
    const len = this.checkedIds.length;
    if(len>0){
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
        )
    }else{
      alert("Please Choose the Candidate Profile for sharing")
    }
    
}
}