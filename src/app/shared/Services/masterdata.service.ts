import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MasterData } from '../Config/master-data.config';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http:HttpClient,private master:MasterData) { }

  getLocations(){
    return this.http.get(environment.masterdata+this.master.loactions)
  }

  getQuestionnaires(id:any){
    return this.http.get(environment.masterManagement+this.master.questionnaire + id)
 
  }

  loactions$ = this.http.get<any[]>(environment.masterdata+this.master.loactions).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  roles$= this.http.get<any[]>(environment.masterdata+this.master.role).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );


  indusrys$= this.http.get<any[]>(environment.masterdata+this.master.industrys).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  ); 
  educations$= this.http.get<any[]>(environment.masterdata+this.master.educations).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );

  companys$= this.http.get<any[]>(environment.masterdata+this.master.companys).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );

  skillList$= this.http.get<any[]>(environment.masterdata+this.master.skills).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );

  perks$= this.http.get<any[]>(environment.masterdata+this.master.perks).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  funcatinalityArea$= this.http.get<any[]>(environment.masterdata+this.master.areaOfInterest).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  employement$= this.http.get<any[]>(environment.masterdata+this.master.employement).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  departments$= this.http.get<any[]>(environment.masterdata+this.master.department).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  designations$= this.http.get<any[]>(environment.masterdata+this.master.designations).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  universities$=this.http.get<any[]>(environment.masterdata+this.master.universities).pipe(
    map((value:any) => {
      return value
    }),
    shareReplay(1)
  );
  specialization$=this.http.get<any[]>(environment.masterdata+this.master.specialization).pipe(
    map((value:any) => {
      return value
    }),
    shareReplay(1)
  );

  jobReason$=this.http.get<string[]>(environment.masterdata+this.master.jobReason).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  candidateReasons$=this.http.get<string[]>(environment.masterdata+this.master.candidateReason).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );

  HighestQualification$=this.http.get<string[]>(environment.masterdata+this.master.highestQualification).pipe(
    map((value: any) => {
      return value
    }),
    shareReplay(1)
  );
  getRoles(){
    return this.http.get(environment.masterdata+this.master.role)

  }
}
