import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../Services/jobs.service';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-edit-job-status',
  templateUrl: './edit-job-status.component.html',
  styleUrls: ['./edit-job-status.component.scss']
})
export class EditJobStatusComponent implements OnInit {
  @Input() openActivePop: boolean = false;
  RequirementStatus!: FormGroup;
  submitted: boolean = false;
  @Input() statusPop: boolean = false;
  eyepopp: boolean = false;
  reasons$: Observable<any> = of({})
  @Output() statuschange = new EventEmitter<boolean>();
  @Output() requirement=new EventEmitter<object>();
  @Input() requirementDetails: any;
  @Input() openDraftPop: boolean = false;
  @Input() statusVisible:boolean=false;
  accountId:string="";

  constructor(private jobService:JobsService,private master:MasterdataService) {
    this.reasons$ = this.master.jobReason$
    this.accountId = JSON.parse(JSON.stringify(localStorage.getItem('accountId')))
   }
  

  ngOnInit(): void {
    this.RequirementStatus = new FormGroup({
      status: new FormControl('', Validators.required),
      reason: new FormControl([], Validators.required),
      comment: new FormControl()
    })

  }
  openActive() {
    this.openActivePop = !this.openActivePop;
  }
  get form(): any { return this.RequirementStatus['controls'] }
  changeStatus() {
    this.openActivePop = false;
    this.statusPop = true;
  }


  eyepop() {
    this.eyepopp = !this.eyepopp;
  }


  statusOpen() {
    this.statuschange.emit(false)
    this.requirement.emit(this.requirementDetails)
  }
  changeReqStatus() {
    this.submitted = true;
    const data={"modifiedDate":new Date(),
    "reasons":this.RequirementStatus.value.reason,
    "comments":this.RequirementStatus.value.comment,
    "modifiedBy": "manimaran",
    "remarkStatus":this.RequirementStatus.value.status};
    if (this.RequirementStatus.invalid) {
      return
    }
    this.jobService.changeJobStatus(this.requirementDetails.requirementId, this.RequirementStatus.value.status, this.RequirementStatus.value.reason, this.RequirementStatus.value.comment)
      .subscribe((value) => {
        console.log(value)
        this.requirementDetails=value;
// this.jobService.addRemark(this.requirementDetails.requirementId,this.accountId,data)
// .subscribe((value) => {
//   console.log(value)
// })
        this.statusOpen();

      });
  }


}
