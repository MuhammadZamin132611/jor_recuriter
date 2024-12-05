import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-view-all-active-jobs',
  templateUrl: './view-all-active-jobs.component.html',
  styleUrls: ['./view-all-active-jobs.component.scss']
})
export class ViewAllActiveJobsComponent implements OnInit {

  activeRequirements:Array<any>=new Array();
  data: any;

  constructor(private api:DashboardService) { 
    this.data = localStorage.getItem("accountId");

  }

  ngOnInit(): void {
    this.getRecruiter()
  }
  getRecruiter() {
    this.api.getActiveRequirements(this.data).subscribe((data: any) => {
      // console.warn("data", data);
      this.activeRequirements = data;
      console.log("recruiterrrrrrrrr")

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
