import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-view-active-team',
  templateUrl: './view-active-team.component.html',
  styleUrls: ['./view-active-team.component.scss']
})
export class ViewActiveTeamComponent implements OnInit {

  showTeam:boolean=true;
  recruiterteam: Array<any>=new Array();
  activeRequirements:Array<any>=new Array();
  data: any;
  id:any;
  name: any = '';
  reqManager: any='';


  constructor(private api:DashboardService) { 
    this.data = localStorage.getItem("accountId");

  }

  ngOnInit(): void {
    this.recruiterteam=[ {
      "recruiterId": null,
      "fullName": "Recruiter",
      "organizationMailId": "recruiters1@gmail.com",
      "mobileNumber": null,
      "imageurl": "1684401334000_1677244512472_1666178444924_1665985707723_jk1.jfif",
      "requirementsCreated": 2,
      "candidatesRequired": 0,
      "jobsPosted": 1,
      "criticalRoles": 0,
      "candidatesSourced": 0,
      "candidatesApplied": 0,
      "candidatesShortListed": 0,
      "candidatesClosed": 0,
      "jobsClosedPercentage": 0,
      "jobsClosed": 0
    },
    {
      "recruiterId": null,
      "fullName": "anilkundae",
      "organizationMailId": "anil@kundan.com",
      "mobileNumber": null,
      "imageurl": "1684416993141_Screenshot (1).png",
      "requirementsCreated": 2,
      "candidatesRequired": 0,
      "jobsPosted": 1,
      "criticalRoles": 0,
      "candidatesSourced": 0,
      "candidatesApplied": 0,
      "candidatesShortListed": 0,
      "candidatesClosed": 0,
      "jobsClosedPercentage": 0,
      "jobsClosed": 0
    },
    {
      "recruiterId": null,
      "fullName": "mani",
      "organizationMailId": "mani@kuni.com",
      "mobileNumber": null,
      "imageurl": "1684417088224_Screenshot (2).png",
      "requirementsCreated": 1,
      "candidatesRequired": 0,
      "jobsPosted": 1,
      "criticalRoles": 0,
      "candidatesSourced": 0,
      "candidatesApplied": 0,
      "candidatesShortListed": 0,
      "candidatesClosed": 0,
      "jobsClosedPercentage": 0,
      "jobsClosed": 0
    },
    {
      "recruiterId": null,
      "fullName": "surea",
      "organizationMailId": "surea@nan.com",
      "mobileNumber": null,
      "imageurl": "1684417049355_Screenshot (3).png",
      "requirementsCreated": 2,
      "candidatesRequired": 0,
      "jobsPosted": 1,
      "criticalRoles": 0,
      "candidatesSourced": 0,
      "candidatesApplied": 0,
      "candidatesShortListed": 0,
      "candidatesClosed": 0,
      "jobsClosedPercentage": 0,
      "jobsClosed": 0
    }]
   this.activeRequirements=[
    {
        "requirementId": "9695bf1b-ab38-4009-a251-5e55bd52faea",
        "title": "Java",
        "status": null,
        "lastModified": null,
        "positionsClosed": 0.0,
        "candidatesOpen": 10.0,
        "totalpositions": 10.0,
        "requirementClosedPercentage": 0.0,
        "candidatesShortListed": 0,
        "accountDtos": [
            {
                "accountId": "3d04a976-f05f-4967-bfc9-dfe0526791ce",
                "fullName": "Rceruiterss",
                "mobileNumber": "8457346262",
                "organizationMailId": "recruiters2@gmail.com",
                "imageurl": "1684401521809_1666178444924_1665985707723_jk1-removebg-preview.png",
                "role": "RECRUITER",
                "status": "ACTIVE"
            }
        ]
    }
]
this .getactiverequirement()
  
this.getRecruiterteam()
  }
 


  getactiverequirement() {
    this.api.getActiveRequirements(this.data).subscribe((data: any) => {
      console.warn("data", data);
      this.activeRequirements = data.filter((job:any)=>job.remarkStatus==="ACTIVE");
      console.log("recruiterrrrrrrrr")

    });
  }


  getRecruiterteam() {
    // this.data = sessionStorage.getItem("ReqManId");
    this.api.ApiGetRecruiterteam(this.data).subscribe((team: any) => {
      console.warn("data", team);
      this.recruiterteam = team;
      console.log("recruiter teammmmm..............")

    });
  }

  setColor(closedposition: number,totalposition:number) {
    const percentage = Math.round((closedposition/totalposition)*100)
    if (percentage > 0 && percentage < 30) {
      return "red";
    }else if (percentage >= 30  && percentage < 60){
      return "#FFC300";
    }else if (percentage >= 60 && percentage <= 100){ 
      return "green";
    } else {
      return "black";
    }
  }

}
