import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../Services/candidate.service';
import { ActivatedRoute } from '@angular/router';
import { CandidateDetails } from '../../Models/candidate.model';

@Component({
  selector: 'app-view-candidate-details',
  templateUrl: './view-candidate-details.component.html',
  styleUrls: ['./view-candidate-details.component.scss']
})
export class ViewCandidateDetailsComponent implements OnInit {
  data1?: any[] = [];
  isLoading: boolean = false;
  noDataAvailable: boolean = false
candidateDetails:any={...new CandidateDetails(),active: 0,update:0};
profile:boolean=true;
resume:boolean=false;
response:boolean=false;
dowm: boolean = false;
src:string='';
resumedata:string='';
id:any;
blob:any;
height:number=0;
userData:any;
profileId:string |undefined
  candidateData: any;
  userBio: any;


  constructor(private candidates:CandidateService,private router:ActivatedRoute ,) { }



  ngOnInit(): void {
    
  
    // this.id=localStorage.getItem("pId");
    // let accountId = localStorage.getItem("accountId")
    // let profileId=''
    // this.router.queryParams.subscribe((params: any) => {

    //   profileId = params.id

      this.router.queryParams.subscribe((res:any)=>{
        this.profileId=res.id

        this.CandidateDetails()

        this.CandidateCertificate()

        this.CandidateBio()
    })


    let date1, date2,date3;

    // this.candidates.getCandidateDetails(profileId).subscribe((res:any)=>{
    //  this.candidateDetails=res;
    //  date2 = new Date();
    //  date1 = new Date(res.lastSeen);
    //  date3=new Date(res.lastUpdated);
    //  let time_difference = date2.getTime() - date1.getTime();
    //  let update_difference=date2.getTime() - date3.getTime();
    //  let days_difference = Math.round(update_difference / (1000 * 60 * 60 * 24));
    //  let update_days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24));

    //  this.candidateDetails.active=days_difference
    //  this.candidateDetails.update=update_days_difference

    //  console.log(this.candidateDetails)
    // })

    // this.candidates.getResume(profileId).subscribe((data:any)=>{
    //   console.log('resume',data)
    //   this.resumedata=data
    // this.src='https://job-check.s3.ap-south-1.amazonaws.com/'+this.resumedata
    // })
  //  this.height=window.innerHeight-30
  //  this.Recruiteraction(accountId,profileId);
  }
 
  
  CandidateDetails(){

    if(this.profileId)
    this.candidates.getFullDetails(this.profileId).subscribe((data:any)=>{
      this.userData=data
      console.log(data)
    })
  }
  

  
  CandidateBio(){

    if(this.profileId)
    this.candidates.getBio(this.profileId).subscribe((data:any)=>{
      this.userBio=data
      console.log(data)
    })
  }

  CandidateCertificate(){

    if(this.profileId)
    this.candidates.getCertificate(this.profileId).subscribe((data:any)=>{
      this.candidateData=data
      console.log(data)
    })
  }


  showProfile(){
    this.profile=true;
    this.response=false;
    this.resume=false;
  }
  showResume(){
    this.profile=false;
    this.response=false;
    this.resume=true;
  }
  showResponse(){
    this.profile=false;
    this.response=true;
    this.resume=false;

   }
   toggle3() {
    this.dowm = !this.dowm;
  }


  download(){
    this.candidates.downlodResume(this.resumedata).subscribe((data:any)=>{
      console.log('completee')
      this.blob = new Blob([data], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download =   this.resumedata;
      link.click();
    })
  }

//notification message for recruiter view

    Recruiteraction(accountId: any,profileId:any) {
      this.candidates.RecruiterView(accountId,profileId).subscribe((data:any) => {
        console.log('Recruiter action notification');
      });
    }
}
