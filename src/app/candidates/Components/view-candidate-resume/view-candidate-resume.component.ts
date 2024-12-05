import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../Services/candidate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidate-resume',
  templateUrl: './view-candidate-resume.component.html',
  styleUrls: ['./view-candidate-resume.component.scss']
})
export class ViewCandidateResumeComponent implements OnInit {
  profile:boolean=true;
  resume:boolean=false;
  response:boolean=false;
  dowm: boolean = false;
  // src:string='https://job-check.s3.ap-south-1.amazonaws.com/1684842833819_png2pdf.pdf'
  resumedata:string='';
  id:any;
  blob:any;

  userData:any;
  profileId:string |undefined;
  constructor(private candidateServ:CandidateService,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((res:any)=>{
      this.profileId=res.id

      this.getCandidateResume()
  })
  }
  pdfSrc = '' ;

  openResume(){
    window. open(this.pdfSrc, '_blank');

  }

  downloadResume(){
    let blob = new Blob([this.pdfSrc], { type: 'application/pdf' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download ='pankaj' + ' ' + 'Resume';
      link.click();
  }

  
  getCandidateResume(){

    if(this.profileId)
    this.candidateServ.getResume(this.profileId).subscribe((data:any)=>{
      this.userData=data
      console.log(data)
      
  this.pdfSrc = 'https://job-check.s3.ap-south-1.amazonaws.com/' + this.userData.value

    })
    
  }
}
