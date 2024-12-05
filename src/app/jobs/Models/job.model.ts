export class BasicJob{
    title:string='';
    jobTitle:string='';
    jobDescription:string='';
    industry:string='';
    functionalityArea:string='';
    role:string='';
    salary:Salary=new Salary();
    empType:string='';
    totalpositions:number=0;
    briefCandidateDescrition:string='';
    workexperience:WorkExp=new WorkExp();
    postedDate=Date;
    // optionalKeyWords:string='';
    // englishFluency:string='';
    gender:string='';
    contactPerson:string='';
    phoneNumber:string='';
    showContactDetails:boolean=false;
    companyName:string='';
    // companytype:string='';
    aboutCompany:string='';
    companyWebsite:string='';
    requirementDueDate:string='';
    openToConsultants:boolean=false;
    statusType:string='DRAFT'
    positionsClosed:number=0
    remarkStatus:string='ACTIVE'
    bookMark:boolean=true
    // workFromHome:string='YES'
    questionnaireDtos:any [] = [
        {
            questionnaire: "What is Java ?",
            questionType: "dropdown",
            required: true,
            options: [
                        "option 1",
                        "option 2"
                    ]
        }
    ];

    musthavekeywords:Array<string>=new Array();
    educationalQualifications:Array<string>=new Array();
    jobperks:Array<string>=new Array();
    locations:Array<string>=new Array();
   
    matchingPercentage:number=0;
}


export class WorkExp{
    min:number=0;
    max:number=0;
}

export class Salary{
    currency:string='';
    minAnnualCTC:number=0;
    maxAnnualCTC:number=0;
    showonsalaryonjobpost:boolean=false;
    variableComponent:boolean=false;
}

export class JobDetails extends BasicJob{
    requirementId:string="";
     recruiterAccounts:Array<AccountDetails>=new Array()
         optionalKeyWords:string='';

}

// export class JobDetails extends BasicJob{
//     requirementId:string="";
//     musthavekeywords:Array<string>=new Array();
//     educationalQualifications:Array<string>=new Array();
//     jobperks:Array<string>=new Array();
//     locations:Array<string>=new Array();
//     recruiterAccounts:Array<AccountDetails>=new Array()
// }

export class AccountDetails{
    accountId:string='';
    imageUrl:string="";
    fullName:string="";
    mobileNumber:string="";
    organizationMailId:string="";
}

