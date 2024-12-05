import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllJobsComponent } from './view-all-jobs.component';
import { JobsService } from '../../Services/jobs.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';

describe('ViewAllJobsComponent', () => {
  let component: ViewAllJobsComponent;
  let fixture: ComponentFixture<ViewAllJobsComponent>;
  let jobsServiceStub: Partial<JobsService>;
  
  beforeEach(async () => {

    jobsServiceStub = {
      getTotalRequirements: () => of([])
    };

    await TestBed.configureTestingModule({
      declarations: [ViewAllJobsComponent],
      providers: [{ provide: JobsService, useValue: jobsServiceStub }],
      imports: [MatTableModule, MatPaginatorModule, MatSortModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });

  it('totalRequirements should be defined', () => {
    expect(component.totalRequirements).toBeDefined();
  });

  it('filtertext should change the dataSource', () => {
    const data = [{ title: 'Job1', status: 'Open' }, { title: 'Job2', status: 'Closed' }];
    component.totalRequirements = data;
    component.filtertext('Open');
    expect(component.dataSource.data.length).toBe(1);
  });

  it('filtertextALL should restore the original dataSource', () => {
    const data = [{ title: 'Job1', status: 'Open' }, { title: 'Job2', status: 'Closed' }];
    component.totalRequirements = data;
    component.filtertext('Open');
    component.filtertextALL('');
    expect(component.dataSource.data.length).toBe(2);
  });
  
  it('requirementsFilter should update datasource to filter job titles', () => {
    const data = [{ title: 'Job1', role: 'Developer' }, { title: 'Job2', role: 'Tester' }];
    component.totalRequirements = data;
    component.requirementsFilter({ target: { value: 'dev' } });
    expect(component.dataSource.data.length).toBe(1);
  });

  it('bookmark should call changeBookmark method and getTotalRequirements method', () => {
    const jobsService = TestBed.inject(JobsService);
    spyOn(jobsService, 'changeBookmark').and.returnValue(of({}));
    spyOn(component, 'getTotalRequirements');
    const job = { id: '1234' };
    component.bookmark(job, true);
    expect(jobsService.changeBookmark).toHaveBeenCalledWith(true, job);
    expect(component.getTotalRequirements).toHaveBeenCalled();
  });

  // it('shareDetails should call share method and getJobDetails method', () => {
  //   spyOn(navigator, 'share');
  //   const jobsService = TestBed.inject(JobsService);
  //   spyOn(jobsService, 'getJobDetails').and.returnValue(of({ title: '', role: '', salary: { minAnnualCTC: } }));
  //   component.shareDetasils('1234');
  //   expect(jobsService.getJobDetails).toHaveBeenCalledWith('1234');
  //   const expectedText = '<div>\n <h1>Title : Job1</h1>\n<h1>Role : Developer</h1>\n<h1>Salary : 100000-undefined</h1>\n<h1>Total Vacancies : undefined</h1>\n<p>Check out more details by visiting our page </p> </div> <br><br><br>  &nbsp;';
  //   expect(navigator.share).toHaveBeenCalledWith({title: expectedText, text: expectedText, url: 'http://localhost/'});
  // });

});
