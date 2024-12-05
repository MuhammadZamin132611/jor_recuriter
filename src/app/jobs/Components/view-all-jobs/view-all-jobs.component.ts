import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { JobsService } from '../../Services/jobs.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobDetails } from '../../Models/job.model';
@Component({
  selector: 'app-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.6, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewAllJobsComponent implements OnInit {
  Assigned:any;
  Modified:any;
  requirementData: any;
  totalcount = 5;
  loader= true;
  displayedColumns: string[] = ['title', 'status', 'statusType', 'totalpositions', 'positionsClosed', 'recruiterAccounts', 'lastModified', 'Actions'];
  // innerDisplayedColumns = ['fullName', 'organizationMailId', 'mobileNumber'];
   innerDisplayedColumns = ['modifiedDate','remarkStatus','modifiedBy','reasons','comments'];
  dataSource = new MatTableDataSource<any>();
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));

  @ViewChild(MatSort)
  sort!: MatSort;
  expandedElement!: null
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  Requirments!: FormGroup;
  step: any;
  accountId:string='';
  comment: any;
  Id: any;
  nomatch: boolean = false;
  SearchFiletr: string = '';
  RequirementSearch: string = '';
  jobId: string = ''
  openDeletePop: boolean = false;
  data: any = '';
  pageSize:number = 5;
  totalRequirements: any;
  remarkspop: boolean = false;
  jobDetails: JobDetails = new JobDetails();
  deletePop: boolean = false;
  actionPop: boolean = false;
  constructor(private jobsService: JobsService) {
    this.getTotalRequirements();

    ;
  }

  m1:any;
  ngOnInit(): void {
    
    let Id = localStorage.getItem("accountId");
    let n:number=5;
    this.jobsService.LastModified(Id).subscribe(Data => {
      this.Modified= Data;
      this.m1=this.Modified[0].assignedTo;
    });
    this.jobsService.Assigned(this.RequirementId).subscribe(Data =>{
      this.Assigned = Data;
    })
    
    this.getTotalRequirements();
    console.log("height",window.innerHeight)
    if(window.innerHeight > 999){
      this.pageSize=10;
    }
  }
  onResize(e:any) {


  }
  RequirementId="";

  // Get all Jobs for the account user
  getTotalRequirements() {
    this.data = localStorage.getItem("accountId");
    console.log(this.data)
    this.jobsService.getTotalRequirements(this.data).subscribe((data: any) => {
      console.warn("data", data);
      this.totalRequirements = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      const sortState: Sort = { active: 'status', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.dataSource.paginator = this.paginator;
    this.loader= false;
      console.log(data);
    });
  }

  bookmark(data: any, value: any) {
    this.jobsService.changeBookmark(value, data).subscribe(res => {
      console.log(res);
      this.getTotalRequirements();

    })
  }

  // Filter The Jobs for All Method

  filtertext(data: any) {

    this.SearchFiletr = data;

    this.dataSource = new MatTableDataSource(this.totalRequirements.filter((user: any) => user.remarkStatus === data));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length == 0) {
      this.nomatch = true;
    } else {
      this.nomatch = false;

    }
  }

  // Filter The Jobs for All Method

  filtertextALL(data: any) {

    this.SearchFiletr = data;

    this.dataSource = new MatTableDataSource(this.totalRequirements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Filter The Jobs Method
  requirementsFilter(e: any) {
    console.log(e.value)
    // this.dataSource = [...this.totalRequirements.filter((user: any) => user.title.toLowerCase().includes(e.target.value.toLowerCase()))];
    this.dataSource = new MatTableDataSource(this.totalRequirements.filter((user: any) => user.jobTitle.toLowerCase().includes(e.target.value.toLowerCase())));

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // if (this.JobDetails.length == 0) {
    //   this.nomatch = true;
    // }
    // else {
    //   this.nomatch = false;
    // }
    // console.log(this.JobDetails)
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // BookMark Method
  // bookmark(data: any, value: any) {
  //   this.jobsService.changeBookmark(value, data).subscribe(res => {
  //     console.log(res);
  //     this.getTotalRequirements();

  //   })
  // }
  // Edit Method

  edit(value: any) {
    console.log(value)

  }
  // Share the job Method
  shareDetasils(id: any) {
    this.jobId = id;
    this.actionPop = !this.actionPop;
  }

  // Delete the job pop open
  DeleteJoPop(id: string) {
    this.jobId = id;
    this.actionPop = !this.actionPop;
    this.deletePop = !this.deletePop
  }

  // Delete the job method
  DeleteJob() {
    this.jobsService.deleteJob(this.jobId).subscribe(res => {
      console.log(res);
      this.openDeletePop = false;
      this.getTotalRequirements();
    })
  }
  

  requirementStatus(e: boolean) {
    this.remarkspop = e;
    this.getTotalRequirements()
  }

  ChangeStatus1(e: any) {
    this.jobDetails = e;
    this.remarkspop = true;
  }

  
  closeDeletePop(e: boolean) {
    this.deletePop = e;
    this.actionPop = e;
    this.getTotalRequirements()
  }
  vaishData:any

  jobSummery(){
    this.data = localStorage.getItem("accountId");
    this.jobsService.LastModified(this.data).subscribe(Data => {
      this.vaishData= Data;
      console.log("VAishnavi",this.vaishData)
      
    });
  }
}
