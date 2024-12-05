import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ProfileSearchService } from '../../Services/profile-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MasterdataService } from 'src/app/shared/Services/masterdata.service';
import { Searchdata } from '../../Models/search.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  profileSearch!: FormGroup;
  minSalaryValue: number | null = null;
  maxSalaryValue: number | null = null;
  boolean: boolean = false;
  // showPopHistory: boolean = false;
  addskill: any = [];
  selectedloc: any = [];
  skills: any;
  locations: any;
  i: any;
  // height: number = 0;
  submitted: boolean = false;
  isDropdownOpen: boolean = false;
  isDropdownOpens: boolean = false;
  showDropdown: boolean = false;
  showExcludeCompaniesDropdown: boolean = false;
  industry: any;
  selectedind: any;
  department: any;
  designations: any;
  selectedskills: any;
  specialization: any;
  universities: any;
  skillList: any[] = [];
  skillList$: Observable<any> = of({});
  booleanSkills$: Observable<any> = of();

  loactions$: Observable<any> = of({});
  industry$: Observable<any> = of({});
  department$: Observable<any> = of({});
  designations$: Observable<any> = of({});
  universities$:Observable<any> = of({});
  specialization$:Observable<any> = of({}); 
  roles$: Observable<any> = of({});
  companies$: Observable<any> = of({});
  search: Searchdata;
  showPop: boolean = false;

  showPopHistory: boolean = false;
  showPopBoolean: boolean = false;
  showHistory: boolean = true;
  showBoolean: boolean = false;
  saveMethod: boolean = false;
  height: number = 0;
  NewForm: any;
  booleanSearch!: FormGroup;
  skillLists: Array<string> = []
  orSkillLists: Array<string> = []
  notSkillLists: Array<string> = []

  constructor(private router: Router, private master: MasterdataService, private api: ProfileSearchService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.master.skillList$.subscribe((value:any)=>{
      this.skillList=value;
      console.log(this.skillList)
    })
    this.booleanSkills$ = this.master.skillList$
    this.master.companys$.subscribe((value:any)=>{
    this.companies=value;
    console.log(this.companies)
    })
    this.master.universities$.subscribe((value:any)=>{
      this.universities=value;
      console.log(this.universities)
    })
    this.master.specialization$.subscribe((value:any)=>{
      this.specialization=value;
      console.log(this.specialization)
    })

    this.loactions$ = this.master.loactions$
    this.industry$ = this.master.indusrys$
    this.department$ = this.master.departments$
    this.designations$ = this.master.designations$
    this.roles$ = this.master.roles$

    this.search = {} as Searchdata;
    this.booleanSkills$.subscribe(value => {
      this.skillLists = value;
      this.orSkillLists = value;
      this.notSkillLists = value;
    });


  }

  ngOnInit(): void {
    localStorage.setItem('search', 'null')
    this.profileSearch = this.fb.group({
      searchTitle: ['', [Validators.required]],
      mustHaveKeyWord: [[], [Validators.required]],
      minSalary: '',
      maxSalary: '',
      location: [],
      minExp: [null, [Validators.min(0)]],
      maxExp: [null, [this.maxValueValidator('minExp')]],
      currency: '',
      industry: [],
      designation: [],
      noticePeriod: null,
      educationalQualification: '',
      specialization: [],
      educationType: '',
      department: [],
      startdate: '',
      enddate: '',
    })
    this.booleanSearch = this.fb.group({
      jobTitle: [[],[Validators.required]],
      skills: [[],[Validators.required]],
      orSkills: [[]],
      notSkills: [[]],
      loactions: [[],[]]
    })
    this.height = window.innerHeight - 162
  }

  selectedSkills(e: any) {
    this.orSkillLists = this.orSkillLists.filter((skill: string) => !e.includes(skill))
    this.notSkillLists = this.notSkillLists.filter((skill: string) => !e.includes(skill))
  }

  selectOrSkills(e:any){
    this.skillLists = this.skillLists.filter((skill: string) => !e.includes(skill))

    this.notSkillLists = this.notSkillLists.filter((skill: string) => !e.includes(skill))

  }

  selectNotSkills(e:any){
    this.skillLists = this.skillLists.filter((skill: string) => !e.includes(skill))
    this.orSkillLists = this.orSkillLists.filter((skill: string) => !e.includes(skill))

  }
  removeSkills(e: any) {
    this.orSkillLists.push(e.value)
    this.orSkillLists.sort((a, b) => a.localeCompare(b));
    this.notSkillLists.push(e.value)
    this.notSkillLists.sort((a, b) => a.localeCompare(b));
    this.booleanSearch.controls['skills'].setValue(this.booleanSearch.value.skills.filter((skills: any) => e.value != skills))
  }
  removeOrSkill(e: any) {
    console.log(e)
    this.skillLists.push(e.value)
    this.skillLists.sort((a, b) => a.localeCompare(b));
    this.notSkillLists.push(e.value)
    this.notSkillLists.sort((a, b) => a.localeCompare(b));
    this.booleanSearch.controls['orSkills'].setValue(this.booleanSearch.value.orSkills.filter((skills: any) => e.value != skills))
  }
  removeNotSkill(e: any) {
    this.skillLists.push(e.value)
    this.skillLists.sort((a, b) => a.localeCompare(b));
    this.orSkillLists.push(e.value)
    this.orSkillLists.sort((a, b) => a.localeCompare(b));
    this.booleanSearch.controls['notSkills'].setValue(this.booleanSearch.value.notSkills.filter((skills: any) => e.value != skills))
  }
  removeLocation(e: any) {

    this.booleanSearch.controls['locations'].setValue(this.booleanSearch.value.locations.filter((skills: any) => e.value != skills))
  }
  removeTitle(e: any) {

    this.booleanSearch.controls['jobTitle'].setValue(this.booleanSearch.value.jobTitle.filter((skills: any) => e.value != skills))

  }
  changeToCurrency(field: string) {
    const value = this.profileSearch.get(field)?.value;
    const numericValue = parseFloat(value.replace(/,/g, ''));
    const formattedValue = new Intl.NumberFormat('en-IN').format(numericValue);
    this.profileSearch.get(field)?.setValue(formattedValue);

    if (field === 'minSalary') {
      this.minSalaryValue = numericValue;
    } else if (field === 'maxSalary') {
      this.maxSalaryValue = numericValue;
    }

  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleExcludeCompaniesDropdown() {
    this.showExcludeCompaniesDropdown = !this.showExcludeCompaniesDropdown;
  }
  toggleDropdowns() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleDropdownss() {
    this.isDropdownOpens = !this.isDropdownOpens;
  }


  onResize(e: any) {
    this.height = window.innerHeight - 162
    console.log(window.innerHeight)
  }

  get form(): any { return this.profileSearch['controls'] }
  get booleanForm(): any { return this.booleanSearch['controls'] }
   companies: Array<string> = []

  booleanpop() {
    this.boolean = !this.boolean;
  }
  showBooleanSearch() {
    this.showBoolean = !this.showBoolean
  }
  onkeydown(event: any) {
    if (event.key === "Enter") {
      if (this.selectedskills.length !== 0) {
        localStorage.setItem('skill', JSON.stringify(this.selectedskills))
        this.router.navigate(['/home']);
      }
    }
  }

  maxValueValidator(controlName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const number1 = control.parent?.get(controlName)?.value; const number2 = control.value;
      if (number1 == null || number2 == null) {
        return null;
      }
      return (number1 < number2 && number2 != 0) ? null : { 'greaterThan': { value: number2 } };
    };
  }

  //only characters
  keyPressChars(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123) && charCode != 32) {
      event.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }

  //only number
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  profileSearchs(value: boolean) {
    this.submitted = true;
    if (this.profileSearch.invalid) {
      return
    }
    if (!this.profileSearch.invalid) {
      this.search.searchTitle = this.profileSearch.value.searchTitle;
      this.search.minSalary = this.profileSearch.value.minSalary;
      this.search.maxSalary = this.profileSearch.value.maxSalary;
      this.search.industry = this.profileSearch.value.industry;
      this.search.location = this.profileSearch.value.location == null ? this.profileSearch.value.location : this.profileSearch.value.location.map((s: any) => {
        return s
      }).join(',');
      this.search.minExp = this.profileSearch.value.minExp;
      this.search.maxExp = this.profileSearch.value.maxExp;
      this.search.industry = this.profileSearch.value.industry;
      this.search.designation = this.profileSearch.value.designation;
      this.search.noticePeriod = this.profileSearch.value.noticePeriod;
      this.search.educationalQualification = this.profileSearch.value.educationalQualification;
      this.search.specialization = this.profileSearch.value.specialization;
      this.search.educationType = this.profileSearch.value.educationType;
      this.search.department = this.profileSearch.value.department;
      this.search.startDate = this.profileSearch.value.startdate == '' ? this.profileSearch.value.startdate : this.profileSearch.value.startdate + '-01-01T00:00:00.763Z';
      this.search.endDate = this.profileSearch.value.enddate == '' ? this.profileSearch.value.enddate : this.profileSearch.value.enddate + '-12-31T24:59:59.763Z';
      this.search.mustHaveKeyWord = this.profileSearch.value.mustHaveKeyWord.map((s: any) => {
        return s
      }).join(',');
      localStorage.setItem('search', JSON.stringify(this.search));
      localStorage.removeItem('booleanResults');
      this.router.navigate(['../view-results'], { relativeTo: this.route });
      // const searchData = localStorage.getItem('search');
      // const data = localStorage.getItem('accountId')
      // this.api.SendSearchdata(data, value, this.search).subscribe((res: any) => {
      //   localStorage.setItem('search', res.searchId);
      //   localStorage.removeItem('booleanResults');

      //   this.submitted = false;
      //   if (value == false) {
      //     this.router.navigate(['../view-results'], { relativeTo: this.route });
      //   }
      // })

    }

  }

  booleanSearchResult() {
    this.submitted = true;
    if (this.booleanSearch.invalid) {
      return
    }
    if (!this.booleanSearch.invalid) {
    const values = this.booleanSearch.value
    this.api.getBooleanSearch(values.jobTitle, values.skills, values.orSkills, values.notSkills, values.loactions).subscribe(res => {
      localStorage.setItem('booleanResults', JSON.stringify(res));
      this.router.navigate(['../view-results'], { relativeTo: this.route });
    })}
  }
  // 
  // changeToCurrency(currencyTextRef: string) {
  //   const currency = this.NewForm.get(currencyTextRef)?.value   
  //   let a = currency;
  //   a = a.replace(/,/g, "");
  //   if (a && !isNaN(+a)) {
  //     let num: number = +a;
  //     let temp = new Intl.NumberFormat("en-IN").format(num); //inplace of en-IN you can mention your country's code
  //     temp = temp ? temp.toString() : '';
  //     this.NewForm.controls[currencyTextRef].setValue(temp);
  //   }
  // }



  // 

  closePopUp(e: boolean) {

    this.showPop = e;

    this.showPopHistory = e;

  }




}
