import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../Services/candidate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidates-responses-for-job',
  templateUrl: './view-candidates-responses-for-job.component.html',
  styleUrls: ['./view-candidates-responses-for-job.component.scss']
})
export class ViewCandidatesResponsesForJobComponent implements OnInit {


src:string='';
resumedata:string='';
id:any;
blob:any;
height:number=0;
userData:any;
profileId:string |undefined
jobId: any;


constructor(private candidates:CandidateService,private router:ActivatedRoute ,) { }



ngOnInit(): void {

    this.router.queryParams.subscribe((res:any)=>{
      this.profileId=res.id
      this.jobId=res.jobId

      this.CandidateResponse()

  })
  }

  CandidateResponse(){

    if(this.profileId)
    this.candidates.CandidateResponse(this.profileId,this.jobId).subscribe((data:any)=>{
      this.userData=data
      console.log(data)
    })

}
}