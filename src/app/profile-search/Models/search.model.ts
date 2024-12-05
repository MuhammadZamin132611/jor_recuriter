export class Searchdata {
  searchId:string='';
  recruiterId:string='';
  searchTitle:string='';
  mustHaveKeyWord:Array<string>=new Array();
  minSalary:number=0;
  maxSalary:number=0;
  location:string='';
  minExp:number=0;
  maxExp:number=0;
  industry:string='';
  designation:string='';
  noticePeriod:string='';
  educationalQualification:string='';
  specialization:string='';
  educationType:string='';
  saved:boolean=false;
  startDate:Date=new Date();
  endDate:Date=new Date();
  department:string='';
}