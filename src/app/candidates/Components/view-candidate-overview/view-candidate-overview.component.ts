import { Component, OnInit } from '@angular/core';
import { candidatesOverview } from 'src/app/shared/Models/candidates.model';
import { CandidateService } from '../../Services/candidate.service';
import { ActivatedRoute } from '@angular/router';
import { resumeBuilder } from '../../../shared/resume.builder';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-candidate-overview',
  templateUrl: './view-candidate-overview.component.html',
  styleUrls: ['./view-candidate-overview.component.scss']
})
export class ViewCandidateOverviewComponent implements OnInit {
  profile:boolean=true;
  resume:boolean=false;
  response:boolean=false;
  userData:any
  profileId:string=''
  constructor(private candidateServ:CandidateService,private actRoute:ActivatedRoute,private resumeBuilder: resumeBuilder , private http: HttpClient) { }


  ngOnInit(): void {
      this.actRoute.queryParams.subscribe((res:any)=>{
          this.profileId=res.id

          this.getCandidateDetails()
      })
          

      
  }


  
downloadresume:Boolean = false;
candidateDetails:any
openModel(){
  
  this.candidateServ.getResume(this.profileId).subscribe((res:any) =>
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
  
  this.candidateServ.getFullDetails(data).subscribe(res => {
    console.log(res)
    this.candidateDetails = res;
    this.resumeBuilder.getProfile(this.candidateDetails)
    this.downloadresume = !this.downloadresume

  })
}




  getCandidateDetails(){
    
    if(this.profileId)
    this.candidateServ.getFullDetails(this.profileId).subscribe((data:any)=>{
      this.userData=data
      console.log(data)
    })
  }


  pdfSrc = "https://job-check.s3.ap-south-1.amazonaws.com/1684842833819_png2pdf.pdf";
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
  downloadResume(){
    let blob = new Blob([this.pdfSrc], { type: 'application/pdf' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download ='pankaj' + ' ' + 'Resume';
      link.click();
  }
  showResponse(){
    this.profile=false;
    this.response=true;
    this.resume=false;
  
   }
   sendEmail() {
    const emailSubject = 'Subject of the email';
    const emailBody = 'Content of the email';   

    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailtoLink);
  }
  shareContent() {
    const contentToShare = 'Content to share'; 
    const shareUrl = 'https://example.com'; 

    if (navigator.share) {
      navigator.share({
        title: 'Title of the shared content',
        text: contentToShare,
        url: shareUrl
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      
      const shareText = `Check out this content: ${contentToShare}`;
      const shareLink = `https://example.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

      window.open(shareLink);
    }
  }
}

