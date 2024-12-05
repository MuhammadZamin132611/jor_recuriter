export class JobsConfig {
    postRequirement:string = 'requirement/details/';
    totalJobs: string = 'totalrequirements/';
    bookMark: string = 'requirement/requirement/bookmark/';
    jobDetails: string = 'requirement-details/';
    recruiters: string = '/users/team/';
    jobPublish: string = 'requirement-publish/';
    jobDraft: string = 'requirement-draft/';
    deleteJob: string = 'requirement/deleterequirement/';
    updateJob: string = 'requirement/requirement/requirement-edit/';
    updateJobStatus:string="requirement/remarksStatus-add/";
    Modified:string="requirements/jobsummary/";
    postJob:string="requirement-jobpost/";
    AssignedTo:string="requirement/assign-account";
    job = {
        locationAdd: 'requirement/requirement/locationtorequirement-add/',
        keyWordsAdd: 'requirement/musthavekeyword-add/',
        perkAdd:'requirement/requirement/jobperks-add/',
        educationAdd:'requirement/requirement/educationalinfo/',
        recruiterAdd:'assigned/recruiter/',
        keywordRemove:'keyword-remove/',
        locationRemove:'requirement/requirement/location/',
        perkRemove:'requirement/requirement/perk/',
        educationRemove:'requirement/requirement/educationdetail/',
        recruiterRemove:'requirement/assign-account/',
        requirementData:'requirement/data/'
    };
    candidates={
        sourced:'candidates-sourced/',
        shortlisted:'candidates-shortlisted/',
        offered:'candidates-offered/',
        applied:'candidates-applied/',
        rejected:'candidates-rejected/',
        list:'candidates/'
    };
    candidatesList:string='jobseekerprofile/job/candidate/'
    candidateStatus:string='candidate/'
    addRemark:string='requirement/remarksStatus-add/'
}