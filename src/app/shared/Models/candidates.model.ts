export class CandidateDetails{
    profileId:string=''
    fullName:string=''
    profilePictureUrl:string=''
    totalWorkExperience:number=0
    email:string=''
    profileToken:string=''
    lastSeen:string=''
    noticePeriod:string=''
    mobileNumber:string=''
    expectedCTC:number=0
    currentCTC:number=0
    matchingPercentage:number=0
    skills:Array<string>=new Array()
    preferedLocations:Array<string>=new Array()
    jobRole:Array<string>=new Array()
    areaOfInterests:Array<string>=new Array()
    educationalQualifications:Array<string>=new Array()
}

export class candidatesOverview extends CandidateDetails{
    active:number=0
    update:number=0
    checked:boolean=false
  selected: unknown
}