import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { JobsService } from '../../Services/jobs.service';
import { BasicJob } from '../../Models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDetails } from '../../Models/job.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  jobId: string = '';
  jobDetails: JobDetails = new JobDetails();
  BasicJob: BasicJob = new BasicJob();
  viewData: any;
  EditForm!: FormGroup;
  submitted: boolean = false;
  CompanyName$: Observable<any> = of({});
  recruitersLists: Array<string> = [];
  EduacationalQualifications$: Observable<any> = of({});
  skillList$: Observable<any> = of({});
  Perks$: Observable<any> = of({});
  Functional_Area$: Observable<any> = of({});
  roles$: Observable<any> = of({});
  EmploymentType$: Observable<any> = of({});
  industry$: Observable<any> = of({});
  locations$: Observable<any> = of({});
  editedJobDetails: JobDetails = new JobDetails();
  publishModel: boolean = false;
  updateModel: boolean = false;
  saveModel: boolean = false;
  RequirementId: any;
  basic: boolean = true;
  job: boolean = false;
  candidate: boolean = false;
  additional: boolean = false;
  questionnaire: boolean = false;
  accountID: any;

  NewJob: BasicJob = new BasicJob();

  constructor(
    private jobService: JobsService,
    private fb: FormBuilder,
    private master: MasterdataService,
    private jobsService: JobsService,
    private router: Router,
    private route: ActivatedRoute,
    private date: DatePipe
  ) {
    this.locations$ = this.master.loactions$;
    this.roles$ = this.master.roles$;
    this.EduacationalQualifications$ = this.master.educations$;
    this.CompanyName$ = this.master.companys$;
    this.EmploymentType$ = this.master.employement$;
    this.industry$ = this.master.indusrys$;
    this.skillList$ = this.master.skillList$;
    this.Perks$ = this.master.perks$;
    this.Functional_Area$ = this.master.funcatinalityArea$;
    // console.log(this.loactions$)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.jobId = params.jobId;
    });
    this.accountID = localStorage.getItem('accountId');

    this.EditForm = this.fb.group({
      Title: new FormControl('', Validators.required),
      JobTitle: new FormControl('', Validators.required),
      JobLocation: new FormControl('', Validators.required),
      Industry: new FormControl(null, Validators.required),
      EmploymentType: new FormControl(null, Validators.required),
      Description: new FormControl('', Validators.required),
      Functional_Area: new FormControl(null, Validators.required),
      Role: new FormControl(null, Validators.required),
      Currency: new FormControl(),
      MinSal: new FormControl('', Validators.required),
      MixSal: new FormControl(null, Validators.required),
      VacanciesAvailable: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[1-9][0-9]*$/)
      ]),
      JobPerks: new FormControl('', Validators.required),
      CandidateDescription: new FormControl(''),
      EduacationalQualifications: new FormControl('', Validators.required),
      WorkExperienceMin: new FormControl('', Validators.required),
      WorkExperienceMax: new FormControl('', Validators.required),
      Musthavekeyword: new FormControl('', Validators.required),
      Recruiter: new FormControl(''),
      Country: new FormControl(),
      OptionalKeywords: new FormControl(''),
      Questionnaire: new FormControl(''),
      ContactPerson: new FormControl(''),
      CompanyName: new FormControl(null, Validators.required),
      AboutCompany: new FormControl(''),
      CompanyWebsite: new FormControl(''),
      Requiredduedate: new FormControl('', [
        Validators.required,
        this.dateRangeValidatorTwo('Requiredduedate'),
      ]),
      PhoneNumber: new FormControl('', Validators.required),
      Gender: new FormControl(''),
      ShowSalary: new FormControl(false),
      ShowVariable: new FormControl(false),
      OpenToConselants: new FormControl(false),
      ShowContact: new FormControl(false),
    });

    this.getJobDetails();

    // console.log('hello', this.locations$);
    // this.date.setDate(this.date.getDate() + 1);
    // this.EditForm = this.fb.group({
    //   Title: new FormControl('', Validators.required),
    //   JobTitle: new FormControl('', Validators.required),
    //   JobLocation: new FormControl('', Validators.required),
    //   Industry: new FormControl(null, Validators.required),
    //   EmploymentType: new FormControl(null, Validators.required),
    //   Description: new FormControl('', Validators.required),
    //   Functional_Area: new FormControl(null, Validators.required),
    //   Role: new FormControl(null, Validators.required),
    //   Currency: new FormControl('INR'),
    //   MinSal: new FormControl('', Validators.required),
    //   MixSal: new FormControl('', Validators.required),
    //   VacanciesAvailable: new FormControl(null, Validators.required),
    //   JobPerks: new FormControl('', Validators.required),
    //   CandidateDescription: new FormControl(''),
    //   EduacationalQualifications: new FormControl('', Validators.required),
    //   WorkExperienceMin: new FormControl(null, [Validators.required]),
    //   WorkExperienceMax: new FormControl(null, [Validators.required]),
    //   Musthavekeyword: new FormControl('', Validators.required),
    //   Recruiter: new FormControl([]),
    //   Gender: new FormControl(''),
    //   ShowSalary: new FormControl(false),
    //   ShowVariable: new FormControl(false),
    //   OpenToConselants: new FormControl(false),
    //   ShowContact: new FormControl(false),

    //   // Country: new FormControl(),
    //   OptionalKeywords: new FormControl(''),
    //   // Questionnaire: new FormControl(''),
    //   ContactPerson: new FormControl(''),
    //   CompanyName: new FormControl(null, Validators.required),
    //   AboutCompany: new FormControl(''),
    //   CompanyWebsite: new FormControl(''),
    //   Requiredduedate: new FormControl('', [
    //     Validators.required,
    //     this.dateRangeValidatorTwo('Requiredduedate'),
    //   ]),
    //   PhoneNumber: new FormControl(''),
    // });
    const el = '10,000';
    this.getRecruiters();
    this.jobService.getAssignrecruiter(this.jobId).subscribe(res => {
      console.log(res);
      const recrList=[]

      for(let recruiters of res){
        if(recruiters.recruiterId!==this.accountID){
          recrList.push(recruiters.recruiterId)
          console.log(recrList)
        }
      }
      this.jobDetails.recruiterAccounts=recrList;
      this.EditForm.controls['Recruiter'].setValue(recrList)

      })
    this.getQuestions();
  }
  arrayCompare(_arr1: any, _arr2: any) {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    ) {
      return false;
    }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }
  errorPop=false
  openUpdateModel() {
    this.submitted = true;
    if (
      this.EditForm.invalid ||
      +this.EditForm.value.MixSal.replace(/,/g, '') <= +this.EditForm.value.MinSal.replace(/,/g, '') ||
      this.EditForm.value.WorkExperienceMax <=
      this.EditForm.value.WorkExperienceMin
    ) {
      this.errorPop=true;
      console.log("data ")
      return;
    } else {
      this.updateModel = true;
      this.editedJobDetails.title = this.EditForm.value.Title;
      this.editedJobDetails.jobTitle = this.EditForm.value.JobTitle;
      this.editedJobDetails.jobDescription = this.EditForm.value.Description;
      this.editedJobDetails.salary.minAnnualCTC = 
        +this.EditForm.value.MinSal.replace(/,/g, '')
      this.editedJobDetails.salary.maxAnnualCTC =+
        this.EditForm.value.MixSal.replace(/,/g, '')
      this.editedJobDetails.totalpositions =
        this.EditForm.value.VacanciesAvailable;
      this.editedJobDetails.briefCandidateDescrition =
        this.EditForm.value.CandidateDescription;
      this.editedJobDetails.optionalKeyWords =
        this.EditForm.value.OptionalKeywords;
      this.editedJobDetails.contactPerson = this.EditForm.value.ContactPerson;
      this.editedJobDetails.companyName = this.EditForm.value.CompanyName;
      this.editedJobDetails.salary.currency = this.EditForm.value.Currency;
      this.editedJobDetails.phoneNumber = this.EditForm.value.PhoneNumber;
      this.editedJobDetails.companyWebsite = this.EditForm.value.CompanyWebsite;
      this.editedJobDetails.requirementDueDate =
        this.EditForm.value.Requiredduedate;
      this.editedJobDetails.role = this.EditForm.value.Role;
      this.editedJobDetails.workexperience.min =
        this.EditForm.value.WorkExperienceMin;
      this.editedJobDetails.workexperience.max =
        this.EditForm.value.WorkExperienceMax;
      this.editedJobDetails.empType = this.EditForm.value.EmploymentType;
      this.editedJobDetails.functionalityArea =
        this.EditForm.value.Functional_Area;
      this.editedJobDetails.gender = this.EditForm.value.Gender;
      this.editedJobDetails.industry = this.EditForm.value.Industry;
      this.editedJobDetails.aboutCompany = this.EditForm.value.AboutCompany;
      this.editedJobDetails.salary.showonsalaryonjobpost =
        this.EditForm.value.ShowSalary;
      this.editedJobDetails.salary.variableComponent =
        this.EditForm.value.ShowVariable;
      this.editedJobDetails.openToConsultants =
        this.EditForm.value.OpenToConselants;
      this.editedJobDetails.showContactDetails =
        this.EditForm.value.ShowContact;
      this.editedJobDetails.locations = this.EditForm.value.JobLocation;
      this.editedJobDetails.jobperks = this.EditForm.value.JobPerks;
      this.editedJobDetails.educationalQualifications =
        this.EditForm.value.EduacationalQualifications;
      this.editedJobDetails.musthavekeywords =
        this.EditForm.value.Musthavekeyword;
      this.editedJobDetails.recruiterAccounts = this.EditForm.value.Recruiter;
      this.editedJobDetails.statusType = this.jobDetails.statusType;
      this.editedJobDetails.remarkStatus = this.jobDetails.remarkStatus;
      this.editedJobDetails.positionsClosed = this.jobDetails.positionsClosed;

      console.log('turitr',this.editedJobDetails);
      this.saveModel = true;
      //this.updateJob()
    }
  }
  //Edit the job details
  filterByReference = (arr1: any[], arr2: any[]) => {
    let res = [];
    res = arr1.filter((el) => {
      return !arr2.find((element) => {
        return element === el;
      });
    });
    return res;
  };
  //To update the
  updateJob() {
    this.jobService
      .updateJob(this.jobId, this.accountID, this.editedJobDetails)
      .subscribe((res) => {
        console.log(res);
        this.updateModel = false;
        this.getJobDetails();
      });
    console.log(
      !this.arrayCompare(
        this.jobDetails.recruiterAccounts,
        this.editedJobDetails.recruiterAccounts
      )
    );
    console.log(this.EditForm.value.JobLocation, this.jobDetails.locations);

    //To add the locations to the job

    if (
      !this.arrayCompare(
        this.jobDetails.locations,
        this.editedJobDetails.locations
      )
    ) {
      const locations = this.editedJobDetails.locations.filter(
        (word: any) => !this.jobDetails.locations.includes(word)
      );
      for (let location of locations) {
        console.log(location);
        this.jobService.addLocation(this.jobId, location).subscribe((res) => {
          console.log(res);
        });
      }
    }
    //To add the jobperks to the job

    if (
      !this.arrayCompare(
        this.jobDetails.jobperks,
        this.editedJobDetails.jobperks
      )
    ) {
      const jobperks = this.editedJobDetails.jobperks.filter(
        (word: any) => !this.jobDetails.jobperks.includes(word)
      );
      for (let perk of jobperks) {
        console.log(perk);
        this.jobService.addPerks(this.jobId, perk).subscribe((res) => {
          console.log(res);
        });
      }
    }
    //To add the edcations to the job

    if (
      !this.arrayCompare(
        this.jobDetails.educationalQualifications,
        this.editedJobDetails.educationalQualifications
      )
    ) {
      const Educations = this.editedJobDetails.educationalQualifications.filter(
        (word: any) => !this.jobDetails.educationalQualifications.includes(word)
      );
      for (let education of Educations) {
        console.log(education);
        this.jobService.addEducation(this.jobId, education).subscribe((res) => {
          console.log(res);
        });
      }
    }
    //To add the keywords to the job

    if (
      !this.arrayCompare(
        this.jobDetails.musthavekeywords,
        this.editedJobDetails.musthavekeywords
      )
    ) {
      const keywords = this.editedJobDetails.musthavekeywords.filter(
        (word: any) => !this.jobDetails.musthavekeywords.includes(word)
      );

      this.jobService.addKeyWords(this.jobId, keywords).subscribe((res) => {
        console.log(res);
      });
    }
    // To add the recruiter to the job
    if (
      !this.arrayCompare(
        this.jobDetails.recruiterAccounts,
        this.EditForm.value.Recruiter
      )
    ) {
      const filterByReference = (arr1: any[], arr2: any[]) => {
        let res = [];
        res = arr1.filter((el) => {
          return !arr2.find((element) => {
            return element === el;
          });
        });
        return res;
      };
      const recruiters = filterByReference(
        this.EditForm.value.Recruiter,
        this.jobDetails.recruiterAccounts
      );
      console.log(recruiters);
     
        for (let recruiter of recruiters) {
          this.jobsService.addRecruiter(recruiter,this.jobId).subscribe(res => {
          })
        }
      
    }

    this.router.navigate(['jobs/view-all-jobs']);
  }
  //To remove the keyword from the job
  removeKeyword(e: any) {
    this.jobService
      .removeKeyWord(this.jobId, e.value)
      .subscribe((res) => console.log(res));
  }
  //To remove the education from the job
  removeEducation(e: any) {
    this.jobService
      .removeEducation(this.jobId, e.value)
      .subscribe((res) => console.log(res));
  }
  //To remove the location from the job
  removeLocation(e: any) {
    this.jobService
      .removeLocation(this.jobId, e.value)
      .subscribe((res) => console.log(res));
  }
  //To remove the perk from the job
  removePerk(e: any) {
    this.jobService
      .removePerk(this.jobId, e.value)
      .subscribe((res) => console.log(res));
  }
  //To remove the recruiter from the job

  removeRecruiter(e: any) {
    console.log(e.value);
    this.jobService.removeRecruiter(this.jobId, e.value.userId).subscribe(res => {
      console.log(res)})
  }
  requirementId = '';

  UpdateReq(val: any) {
    console.log(val.value);
    this.jobService
      .UpdateReq(this.requirementId, val.value)
      .subscribe((result) => {
        console.log(result, 'data uploaded successfully');
      });
  }
  id = '';
  quesionList: any[] = [];
  getQuestions() {
    this.master.getQuestionnaires(this.id).subscribe((res: any) => {
      this.quesionList = res.dataValues;
      console.log('questionlist ', this.quesionList);
    });
  }

  setdata: any = [];
  Title: any;
  JobTitle: any;
  JobLocation: any;
  Industry: any;
  emailId: any;
  organizationName: any;
  createdDate: any;
  modifiedDate: any;
  country: any;
  Role: any;
  functionalityArea: any;

  edit() {
    this.BasicJob.title = this.EditForm.value.title;
    this.BasicJob.jobTitle = this.EditForm.value.jobTitle;
    this.BasicJob.jobDescription = this.EditForm.value.jobDescription;
    this.BasicJob.industry = this.EditForm.value.industry;
    this.BasicJob.functionalityArea = this.EditForm.value.functionalityArea;
    this.BasicJob.role = this.EditForm.value.role;
    this.BasicJob.salary = this.EditForm.value.salary;
    this.BasicJob.empType = this.EditForm.value.empType;

    console.log('this.BasicJob==========', this.BasicJob);
    this.jobsService
      .EditJob(this.RequirementId, this.BasicJob)
      .subscribe((data: any) => {
        console.log(data, '==');
      });
  }

  getJobDetails() {
    this.jobService.getJobDetails(this.jobId).subscribe((res) => {
      console.log(res);
      this.jobDetails = res;
      this.EditForm.controls['Title'].setValue(res.title);
      this.EditForm.controls['JobTitle'].setValue(res.jobTitle);
      this.EditForm.controls['Industry'].setValue(res.industry);
      this.EditForm.controls['EmploymentType'].setValue(res.empType);
      this.EditForm.controls['Description'].setValue(res.jobDescription);
      this.EditForm.controls['Functional_Area'].setValue(res.functionalityArea);
      this.EditForm.controls['Role'].setValue(res.role);
      this.EditForm.controls['Currency'].setValue(res.salary.currency);
      this.EditForm.controls['MinSal'].setValue(new Intl.NumberFormat('en-IN').format(res.salary.minAnnualCTC));
      this.EditForm.controls['MixSal'].setValue(new Intl.NumberFormat('en-IN').format(res.salary.maxAnnualCTC));
      this.EditForm.controls['VacanciesAvailable'].setValue(res.totalpositions);
      this.EditForm.controls['CandidateDescription'].setValue(
        res.briefCandidateDescrition
      );
      this.EditForm.controls['WorkExperienceMin'].setValue(
        res.workexperience.min
      );
      this.EditForm.controls['WorkExperienceMax'].setValue(
        res.workexperience.max
      );
      this.EditForm.controls['OptionalKeywords'].setValue(res.optionalKeyWords);
      this.EditForm.controls['ContactPerson'].setValue(res.contactPerson);
      this.EditForm.controls['CompanyName'].setValue(res.companyName);
      this.EditForm.controls['AboutCompany'].setValue(
        res.aboutCompany == null ? '' : res.aboutCompany
      );
      this.EditForm.controls['CompanyWebsite'].setValue(res.companyWebsite);
      this.EditForm.controls['PhoneNumber'].setValue(res.phoneNumber);
      this.EditForm.controls['Gender'].setValue(res.gender);
      this.EditForm.controls['ShowSalary'].setValue(
        res.salary.showonsalaryonjobpost
      );
      this.EditForm.controls['ShowVariable'].setValue(
        res.salary.variableComponent
      );
      this.EditForm.controls['OpenToConselants'].setValue(
        res.openToConsultants
      );
      this.EditForm.controls['ShowContact'].setValue(res.showContactDetails);
      this.EditForm.controls['Requiredduedate'].setValue(
        this.date.transform(res.requirementDueDate, 'yyyy-MM-dd')
      );

      this.EditForm.controls['JobLocation'].setValue(res.locations);
      this.EditForm.controls['JobPerks'].setValue(res.jobperks);
      this.EditForm.controls['EduacationalQualifications'].setValue(
        res.educationalQualifications
      );
      this.EditForm.controls['Musthavekeyword'].setValue(res.musthavekeywords);
      this.EditForm.controls['Recruiter'].setValue(res.recruiterAccounts);
    });
  }
  selectedQuestionData: any[] = [];

  con(val: any) {
    if (!this.selectedQuestionData.includes(val))
      this.selectedQuestionData.push(val);
    else {
      let i = this.selectedQuestionData.indexOf(val);
      this.selectedQuestionData.splice(i, 1);
    }

    console.log(this.selectedQuestionData);
  }

  importQues() { }

  showBasicjobdetails() {
    this.basic = true;
    this.candidate = false;
    this.additional = false;
    this.questionnaire = false;
  }
  showCandidatedetails() {
    this.basic = true;
    this.candidate = true;
    this.additional = false;
    this.questionnaire = false;
  }
  showAdditionaldetails() {
    this.basic = true;
    this.candidate = false;
    this.additional = true;
    this.questionnaire = false;
  }
  showQuestionnaire() {
    this.basic = true;
    this.candidate = false;
    this.additional = false;
    this.questionnaire = true;
  }

  get f(): any {
    return this.EditForm['controls'];
  }
  private dateRangeValidatorTwo(fromName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let invalid = false;
      const currentDate = new Date();
      // currentDate.setDate(currentDate.getDate() + 1)
      const from = this.EditForm && this.EditForm.get(fromName)?.value;
      if (from && currentDate) {
        invalid = new Date(from).valueOf() < new Date(currentDate).valueOf();
        // console.log(invalid);
      }
      // console.log(invalid);

      return invalid ? { invalidRange: { from, currentDate } } : null;
    };
  }
  //To open the pop-ups
  CreateJob(value: string) {
    this.transferData();
    console.log(this.EditForm.value);
    this.setValues();
    this.submitted = true;
    if (
      this.EditForm.invalid ||
      +this.EditForm.value.MixSal.replace(/,/g, '') <=
      +this.EditForm.value.MinSal.replace(/,/g, '') ||
      this.EditForm.value.WorkExperienceMax <=
      this.EditForm.value.WorkExperienceMin
    ) {
      return;
    } else {
      if (value === 'Publish') {
        this.publishModel = true;
        this.setValues();
      } else {
        this.saveModel = true;
        this.setValues();
      }

      console.log(this.EditForm.value);
    }
  }

  //To make allow only numbers as input
  keyPressNumbers(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    let charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  changeToCurrency(currencyTextRef: string) {
    const currency = this.EditForm.get(currencyTextRef)?.value;
    let a = currency;
    a = a.replace(/,/g, '');
    if (a && !isNaN(+a)) {
      let num: number = +a;
      let temp = new Intl.NumberFormat('en-IN').format(num); //inplace of en-IN you can mention your country's code
      temp = temp ? temp.toString() : '';
      this.EditForm.controls[currencyTextRef].setValue(temp);
    }
  }
  //only characters
  keyPressChars(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    var charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 123) &&
      charCode != 32
    ) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //To get all the recruiters linked with RecruiterManager
  getRecruiters() {
    const data = JSON.parse(JSON.stringify(localStorage.getItem('accountId')));
    this.jobsService.getRecruitersAccount(data).subscribe((res: any) => {
      this.recruitersLists = res;
    });
  }

  //To set the values of the form to the model object to send the data
  setValues() {
    this.NewJob.title = this.EditForm.value.Title;
    this.NewJob.jobTitle = this.EditForm.value.JobTitle;
    this.NewJob.jobDescription = this.EditForm.value.Description;
    this.NewJob.salary.minAnnualCTC = parseInt(
      this.EditForm.value.MinSal.replace(/,/g, '')
    );
    this.NewJob.salary.maxAnnualCTC = parseInt(
      this.EditForm.value.MixSal.replace(/,/g, '')
    );
    this.NewJob.totalpositions = this.EditForm.value.VacanciesAvailable;
    this.NewJob.briefCandidateDescrition =
      this.EditForm.value.CandidateDescription;
    // this.NewJob.optionalKeyWords = this.EditForm.value.OptionalKeywords;
    this.NewJob.contactPerson = this.EditForm.value.ContactPerson;
    this.NewJob.companyName = this.EditForm.value.CompanyName;
    this.NewJob.salary.currency = this.EditForm.value.Currency;
    this.NewJob.phoneNumber = this.EditForm.value.PhoneNumber;
    this.NewJob.companyWebsite = this.EditForm.value.CompanyWebsite;
    this.NewJob.requirementDueDate = this.EditForm.value.Requiredduedate;
    this.NewJob.role = this.EditForm.value.Role;
    this.NewJob.workexperience.min = this.EditForm.value.WorkExperienceMin;
    this.NewJob.workexperience.max = this.EditForm.value.WorkExperienceMax;
    this.NewJob.empType = this.EditForm.value.EmploymentType;
    this.NewJob.functionalityArea = this.EditForm.value.Functional_Area;
    this.NewJob.gender = this.EditForm.value.Gender;
    this.NewJob.industry = this.EditForm.value.Industry;
    this.NewJob.aboutCompany = this.EditForm.value.AboutCompany;
    this.NewJob.salary.showonsalaryonjobpost = this.EditForm.value.ShowSalary;
    this.NewJob.salary.variableComponent = this.EditForm.value.ShowVariable;
    this.NewJob.openToConsultants = this.EditForm.value.OpenToConselants;
    this.NewJob.showContactDetails = this.EditForm.value.ShowContact;
    this.NewJob.questionnaireDtos = this.postquestion;
    // =====================
    this.NewJob.locations = this.EditForm.value.JobLocation;
    this.NewJob.musthavekeywords = this.EditForm.value.Musthavekeyword;
    this.NewJob.educationalQualifications =
      this.EditForm.value.EduacationalQualifications;
    this.NewJob.jobperks = this.EditForm.value.JobPerks;
    // this.NewJob.questionnaireDtos
    if (this.publishModel) {
      this.NewJob.statusType = 'PUBLISHED';
    } else {
      this.NewJob.statusType = 'DRAFT';
    }

    console.log(this.NewJob);
  }

  //To store the job as publsih or save
  PublishOrSave(status: string) {
    const accountId = localStorage.getItem('accountId');
    console.log(this.EditForm.value);
    if (status === 'Publish') {
      this.jobsService
        .publishJob(this.NewJob, accountId)
        .subscribe((res: any) => {
          console.log(res, 'published');
          this.publishNotification(res.requirementId);
          this.publishModel = false;
          this.router.navigate(['../view-all-jobs'], {
            relativeTo: this.route,
          });
        });
    } else {
      this.NewJob.statusType = 'DRAFT';
      this.jobsService.publishJob(this.NewJob, accountId).subscribe((res) => {
        console.log(res);
        this.saveModel = false;
        this.router.navigate(['../view-all-jobs'], {
          relativeTo: this.route,
        });
      });
    }
  }
  //notification message for publish

  publishNotification(jobId: any) {
    this.jobsService.jobpublish(jobId).subscribe((data) => {
      console.log('published notification');
    });
  }
  basics() {
    this.basic = true;
    this.job = false;
    this.candidate = false;
    this.additional = false;
    this.questionnaire = false;
  }
  jobs() {
    this.basic = false;
    this.job = true;
    this.candidate = false;
    this.additional = false;
    this.questionnaire = false;
  }
  candidates() {
    this.basic = false;
    this.job = false;
    this.candidate = true;
    this.additional = false;
    this.questionnaire = false;
  }
  additionals() {
    this.basic = false;
    this.job = false;
    this.candidate = false;
    this.additional = true;
    this.questionnaire = false;
  }
  questionnaires() {
    this.basic = false;
    this.job = false;
    this.candidate = false;
    this.additional = false;
    this.questionnaire = true;
  }

  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === '0') {
      event.preventDefault();
    }
  }

  // Questinary
  value: string | null = 'Untitled Question';

  placeHolder: string = 'Enter your answer';
  text = 'hidden';
  label: string = 'Short Answer';
  title = () => {
    this.value = null;
  };
  hello: string | null = '';

  hello1() {
    console.log('helllloo', this.hello);
  }

  questions: {
    placeHolder: string;
    text: string;
    label: string;
    questionName: string;
    options: { text: string }[];
    required: boolean;
  }[] = [
      {
        text: 'hidden',
        placeHolder: 'Enter your Answer',
        label: 'Short Answer',
        questionName: '',
        options: [{ text: '' }],
        required: false,
      },
    ];

  Questionarie: boolean = false;
  Qpop() {
    this.Questionarie = !this.Questionarie;
  }

  addQuestion() {
    if (this.questions.length < 10)
      this.questions.push({
        text: 'hidden',
        placeHolder: 'Enter your Answer',
        label: 'Short Answer',
        questionName: '',
        options: [{ text: '' }],
        required: false,
      });
  }

  deleteQuestion(index: number) {
    if (this.questions.length > 1) this.questions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push({ text: '' });
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

  toggleRequired(question: {
    questionName: string;
    options: { text: string }[];
    required: boolean;
  }) {
    question.required = !question.required;
  }

  saveData() {
    console.log(this.questions);
  }

  postquestion: any[] = [];

  transferData = () => {
    for (let i = 0; i < this.questions.length; i++) {
      let transData = {
        questionType: '',
        questionnaire: 'What is  the  question?',
        options: ([] = ['']),
        required: true,
      };

      transData.questionType = this.questions[i].label;
      transData.questionnaire = this.questions[i].questionName;
      if (this.questions[i].required) {
        transData.required = true;
      } else {
        transData.required = false;
      }
      // transData.required = this.questions[i].required;
      for (let j = 0; j < this.questions[i].options.length; j++) {
        transData.options[j] = this.questions[i].options[j].text;
      }
      this.postquestion.push(transData);
    }
    console.log(this.postquestion, 'data transfer');
  };

  addbutton: boolean = false;
  placeholder: string = 'Option';

  label2(index: number) {
    if (this.questions[index].label === 'Short Answer') {
      this.addbutton = true;
      this.questions[index].label = 'Multiple Choice';
      this.questions[index].text = 'radio';
      this.questions[index].placeHolder = 'Option 1';
      this.questions[index].options = [{ text: '' }, { text: '' }];
    } else if (this.questions[index].label === 'Multiple Choice') {
      this.questions[index].label = 'Checkboxes';
      this.addbutton = true;
      this.questions[index].options = [{ text: '' }, { text: '' }];
      this.questions[index].text = 'checkbox';
      this.questions[index].placeHolder = 'Option 1';
    } else if (this.questions[index].label === 'Checkboxes') {
      this.questions[index].label = 'Dropdown';
      this.addbutton = true;
      this.questions[index].text = 'hidden';
      this.questions[index].options = [{ text: '' }, { text: '' }];
      this.questions[index].placeHolder = 'Option 1';
    } else if (this.questions[index].label === 'Dropdown') {
      this.questions[index].label = 'Short Answer';
      this.addbutton = false;
      this.questions[index].text = 'hidden';
      this.questions[index].placeHolder = 'Enter your answer';
      this.questions[index].options = [{ text: '' }];
    } else {
      this.questions[index].label = 'Short Answer';
      this.questions[index].placeHolder = 'Enter your answer';
      this.addbutton = false;
      // this.questions[index].text ='hidden';
    }
  }

  searchedTemlpate = '';

  importQuestion() {
    this.selectedQuestionData.map((el) => {
      if (this.questions.length < 10)
        this.questions.push({
          placeHolder: '',
          text: 'hidden',
          label: 'Short Answer',
          questionName: el,
          options: ([] = [{ text: '' }]),
          required: false,
        });
    });
    this.selectedQuestionData = [];
  }
}
