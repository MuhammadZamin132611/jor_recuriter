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

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  NewForm!: FormGroup;
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
  date = new Date();

  publishModel: boolean = false;
  saveModel: boolean = false;
  RequirementId: any;
  basic: boolean = true;
  job: boolean = false;
  candidate: boolean = false;
  additional: boolean = false;
  questionnaire: boolean = false;

  NewJob: BasicJob = new BasicJob();
  constructor(
    private fb: FormBuilder,
    private master: MasterdataService,
    private jobsService: JobsService,
    private router: Router,
    private route: ActivatedRoute
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
    this.getRecruiters();
    console.log('hello', this.locations$);
    this.date.setDate(this.date.getDate() + 1);
    this.NewForm = this.fb.group({
      Title: new FormControl('', Validators.required),
      JobTitle: new FormControl('', Validators.required),
      JobLocation: new FormControl('', Validators.required),
      Industry: new FormControl(null, Validators.required),
      EmploymentType: new FormControl(null, Validators.required),
      Description: new FormControl('', Validators.required),
      Functional_Area: new FormControl(null, Validators.required),
      Role: new FormControl(null, Validators.required),
      Currency: new FormControl('INR'),
      MinSal: new FormControl('', Validators.required),
      MixSal: new FormControl('', Validators.required),
      VacanciesAvailable: new FormControl('', [Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
      JobPerks: new FormControl('', Validators.required),
      CandidateDescription: new FormControl(''),
      EduacationalQualifications: new FormControl('', Validators.required),
      WorkExperienceMin: new FormControl('', [Validators.required]),
      WorkExperienceMax: new FormControl('', [Validators.required]),
      Musthavekeyword: new FormControl('', Validators.required),
      Recruiter: new FormControl([]),
      Gender: new FormControl(''),
      ShowSalary: new FormControl(false),
      ShowVariable: new FormControl(false),
      OpenToConselants: new FormControl(false),
      ShowContact: new FormControl(false),

      // Country: new FormControl(),
      OptionalKeywords: new FormControl(''),
      // Questionnaire: new FormControl(''),
      ContactPerson: new FormControl(''),
      CompanyName: new FormControl(null, Validators.required),
      AboutCompany: new FormControl(''),
      CompanyWebsite: new FormControl(''),
      Requiredduedate: new FormControl('', [
        Validators.required,
        this.dateRangeValidatorTwo('Requiredduedate'),
      ]),
      PhoneNumber: new FormControl(''),
    });
    const el = '10,000';
    
    console.log(+el.replace(',', ''));

    this.getQuestions();
  }

  quesionList:any[]=[]
  id="";
  getQuestions(){
        this.master.getQuestionnaires(this.id).subscribe((res:any)=>{
          this.quesionList=res.dataValues;
          console.log(this.quesionList)
        })
  }


  selectedQuestionData:any[]=[]

  con(val:any){
    if(!this.selectedQuestionData.includes(val))
      this.selectedQuestionData.push(val)
      else
      {
        let i = this.selectedQuestionData.indexOf(val)
        this.selectedQuestionData.splice(i,1)}

      console.log(this.selectedQuestionData)
  }

  importQues(){
  
  }

 
  showBasicjobdetails(){
    this.basic=true;
    this.candidate=false;
    this.additional=false;
    this.questionnaire=false;
  }
  showCandidatedetails(){
    this.basic=true;
    this.candidate=true;
    this.additional=false;
    this.questionnaire=false;
  }
  showAdditionaldetails(){
    this.basic=false;
    this.candidate=false;
    this.additional=true;
    this.questionnaire=false;
  
   }
   showQuestionnaire(){
    this.basic=true;
    this.candidate=false;
    this.additional=false;
    this.questionnaire=true;
  
   }

  get f(): any {
    return this.NewForm['controls'];
  }
  private dateRangeValidatorTwo(fromName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let invalid = false;
      const currentDate = new Date();
      // currentDate.setDate(currentDate.getDate() + 1)
      const from = this.NewForm && this.NewForm.get(fromName)?.value;
      if (from && currentDate) {
        invalid = new Date(from).valueOf() < new Date(currentDate).valueOf();
        console.log(invalid);
      }
      console.log(invalid);

      return invalid ? { invalidRange: { from, currentDate } } : null;
    };
  }

  errorPop=false
  //To open the pop-ups
  CreateJob(value: string) {
    this.transferData()
    console.log(this.NewForm.value);
    this.setValues();
    this.submitted = true;
    if (
      this.NewForm.invalid ||
      +this.NewForm.value.MixSal.replace(/,/g, '') <=
        +this.NewForm.value.MinSal.replace(/,/g, '') ||
      this.NewForm.value.WorkExperienceMax <=
        this.NewForm.value.WorkExperienceMin
    ) {
      this.errorPop=true
      return;
    } else {
      if (value === 'Publish') {
        this.publishModel = true;
        this.setValues();

      } else {
        this.saveModel = true;
        this.setValues();
   
 
      }

      console.log(this.NewForm.value);
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
    const currency = this.NewForm.get(currencyTextRef)?.value;
    let a = currency;
    a = a.replace(/,/g, '');
    if (a && !isNaN(+a)) {
      let num: number = +a;
      let temp = new Intl.NumberFormat('en-IN').format(num); //inplace of en-IN you can mention your country's code
      temp = temp ? temp.toString() : '';
      this.NewForm.controls[currencyTextRef].setValue(temp);
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
      console.log("getting recruiter")
    });
  }

  //To set the values of the form to the model object to send the data
  setValues() {
    
    this.NewJob.title = this.NewForm.value.Title;
    this.NewJob.jobTitle = this.NewForm.value.JobTitle;
    this.NewJob.jobDescription = this.NewForm.value.Description;
    this.NewJob.salary.minAnnualCTC = parseInt(
      this.NewForm.value.MinSal.replace(/,/g, '')
    );
    this.NewJob.salary.maxAnnualCTC = parseInt(
      this.NewForm.value.MixSal.replace(/,/g, '')
    );
    this.NewJob.totalpositions = this.NewForm.value.VacanciesAvailable;
    this.NewJob.briefCandidateDescrition =
      this.NewForm.value.CandidateDescription;
    // this.NewJob.optionalKeyWords = this.NewForm.value.OptionalKeywords;
    this.NewJob.contactPerson = this.NewForm.value.ContactPerson;
    this.NewJob.companyName = this.NewForm.value.CompanyName;
    this.NewJob.salary.currency = this.NewForm.value.Currency;
    this.NewJob.phoneNumber = this.NewForm.value.PhoneNumber;
    this.NewJob.companyWebsite = this.NewForm.value.CompanyWebsite;
    this.NewJob.requirementDueDate =this.NewForm.value.Requiredduedate
    this.NewJob.role = this.NewForm.value.Role;
    this.NewJob.workexperience.min = this.NewForm.value.WorkExperienceMin;
    this.NewJob.workexperience.max = this.NewForm.value.WorkExperienceMax;
    this.NewJob.empType = this.NewForm.value.EmploymentType;
    this.NewJob.functionalityArea = this.NewForm.value.Functional_Area;
    this.NewJob.gender = this.NewForm.value.Gender;
    this.NewJob.industry = this.NewForm.value.Industry;
    this.NewJob.aboutCompany = this.NewForm.value.AboutCompany;
    this.NewJob.salary.showonsalaryonjobpost = this.NewForm.value.ShowSalary;
    this.NewJob.salary.variableComponent = this.NewForm.value.ShowVariable;
    this.NewJob.openToConsultants = this.NewForm.value.OpenToConselants;
    this.NewJob.showContactDetails = this.NewForm.value.ShowContact;
    this.NewJob.questionnaireDtos = this.postquestion
    // =====================
    this.NewJob.locations =  this.NewForm.value.JobLocation
    this.NewJob.musthavekeywords =  this.NewForm.value.Musthavekeyword
    this.NewJob.educationalQualifications = this.NewForm.value.EduacationalQualifications
    this.NewJob.jobperks =  this.NewForm.value.JobPerks
    // this.NewJob.questionnaireDtos
    if(this.publishModel){
      this.NewJob.statusType='PUBLISHED'
    }else{
      this.NewJob.statusType='DRAFT'
    }

    console.log(this.NewJob);
  }

  //To store the job as publsih or save
  PublishOrSave(status: string) {
    const accountId = localStorage.getItem('accountId');
    console.log(this.NewForm.value);
    if (status === 'Publish') {
 
      this.jobsService
        .publishJob(
          this.NewJob,
          accountId,
        )
        .subscribe((res: any) => {
          console.log(res, 'published');
          for (let recruiter of this.NewForm.value.Recruiter) {
            this.jobsService.addRecruiter(recruiter,res.requirementId).subscribe(res => {
            })
          }
          this.publishNotification(res.requirementId);
          this.publishModel = false;
          this.router.navigate(['../view-all-jobs'], {
            relativeTo: this.route,
          });
        });
    } else {

      this.NewJob.statusType='DRAFT'      
      this.jobsService
        .publishJob(
          this.NewJob,
          accountId,
        )
        .subscribe((res) => {
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
 
  placeHolder:string = 'Enter your answer'
  text = 'hidden';
  label: string = 'Short Answer';
  title = () => {
    this.value = null;
  };
  hello:string |null = ''

  hello1(){
    console.log('helllloo',this.hello);
  }

  questions: {
    placeHolder: string;
    text: string;
    label: string; questionName: string, options: { text: string }[], required: boolean 
}[] = [
    {
      text:'hidden',
      placeHolder:'Enter your Answer',
      label:'Short Answer',
      questionName: '',
      options: [
        { text: '' }
      ],
      required: false
    }
  ];

  Questionarie: boolean = false;
  Qpop(){
    this.Questionarie=!this.Questionarie;

  }




  addQuestion() {
    if(this.questions.length<10)
    this.questions.push({
      text:'hidden',
      placeHolder:'Enter your Answer',
      label:'Short Answer',
      questionName: '',
      options: [
        { text: '' }
      ],
      required: false
    });
  }

  deleteQuestion(index: number) {
    if(this.questions.length>1)
    this.questions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push({ text: '' });
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

  toggleRequired(question: { questionName: string, options: { text: string }[], required: boolean }) {
    question.required = !question.required;
  }

  saveData() {
    console.log(this.questions);
  }
 

postquestion:any[]=[]

transferData=()=>{
  for(let i = 0; i < this.questions.length; i++){
    let transData={
      questionType:'',
      questionnaire:'What is  the  question?' ,
      options:[]=[''],
      required: true
    };

    transData.questionType = this.questions[i].label;
    transData.questionnaire = this.questions[i].questionName;
    if( this.questions[i].required){
      transData.required = true
    }else{
      transData.required = false
    }
    // transData.required = this.questions[i].required;
    for (let j = 0; j < this.questions[i].options.length; j++) {
      transData.options[j] = this.questions[i].options[j].text;
    }
    this.postquestion.push(transData)
  }
  console.log(this.postquestion,"data transfer")
}

  addbutton:boolean = false
  placeholder:string = 'Option'

  label2(index: number) {
    if (this.questions[index].label === 'Short Answer') {
      this.addbutton = true
      this.questions[index].label = 'Multiple Choice';
      this.questions[index].text = 'radio';
      this.questions[index].placeHolder = 'Option 1';
      this.questions[index].options = [
        { text: '' },
        { text: '' }
      ];
    } else if (this.questions[index].label === 'Multiple Choice') {
      this.questions[index].label = 'Checkboxes';
      this.addbutton = true
      this.questions[index].options = [
        { text: '' },
        { text: '' }
      ];
      this.questions[index].text = 'checkbox';
      this.questions[index].placeHolder = 'Option 1';
    } else if (this.questions[index].label === 'Checkboxes') {
      this.questions[index].label = 'Dropdown';
      this.addbutton = true
      this.questions[index].text = 'hidden';
      this.questions[index].options = [
        { text: '' },
        { text: '' }
      ];
      this.questions[index].placeHolder = 'Option 1';
    } else if (this.questions[index].label === 'Dropdown') {
      this.questions[index].label = 'Short Answer';
      this.addbutton = false
      this.questions[index].text = 'hidden';
      this.questions[index].placeHolder = 'Enter your answer';
      this.questions[index].options = [
        { text: '' },
      ];
    } else {
      this.questions[index].label = 'Short Answer';
      this.questions[index].placeHolder = 'Enter your answer';
      this.addbutton = false
      // this.questions[index].text ='hidden';
    }
  }
  
searchedTemlpate=''
  

  importQuestion(){
    this.selectedQuestionData.map(el=>{

      if(this.questions.length<10)
      this.questions.push({
        placeHolder:'',
        text:'hidden',
        label:'Short Answer',
        questionName:el,
        options:[]=[{ text: '' }],
        required: false
      })
    })
    this.selectedQuestionData=[]
  }

}
