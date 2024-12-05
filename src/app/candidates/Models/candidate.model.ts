export class CandidateDetails{
    checked:boolean=false
    profileId:string=''
    fullName:string=''
    profilePictureUrl:string=''
    personalBio:string=''
    experience:Array<Experience>=new Array()
    languages:Array<string>=new Array()
    education:Array<Education>=new Array()
    gender:string=''
    age:number=0
    totalWorkExperience:number=0
    email:string=''
    mobileNumber:string=''
    skills:number=0
    preferedLocations:Array<string>=new Array()
    expectedCTC:number=0
    noticePeriod:number=0
    currentCTC:number=0
    lastSeen:Date=new Date()
    lastUpdated:Date=new Date()
    jobRole:Array<string>=new Array()
    areaOfInterests:Array<string>=new Array()
    educationalQualifications:Array<string>=new Array()
}

class Education{
    educationDetailsId:string=''
    qualification:string=''
    board:string=''
    course:string=''
    courseType:string=''
    specialization:string=''
    startDate:Date=new Date()
    endDate:Date=new Date()
    passingOutYear:number=0
}

class Experience{
    workExperienceId:string=''
    jobTitle:string=''
    companyName:string=''
    workExp:number=0
    jobDescription:string=''
}