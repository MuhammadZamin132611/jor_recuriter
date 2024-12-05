import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-view-all-active-team',
  templateUrl: './view-all-active-team.component.html',
  styleUrls: ['./view-all-active-team.component.scss']
})

export class ViewAllActiveTeamComponent implements OnInit {

  recruiterteam:Array<any>=new Array();
  data: any;

  constructor(private api:DashboardService) { 
    this.data = localStorage.getItem("accountId");

  }

  ngOnInit(): void {
    this.getRecruiterteam()
  }
  getRecruiterteam() {
    // this.data = sessionStorage.getItem("ReqManId");
    this.api.ApiGetRecruiterteam(this.data).subscribe((team: any) => {
      console.warn("data", team);
      this.recruiterteam = team;
      console.log("recruiter teammmmm..............")

    });
  }
  setColor(percentage: any) {
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