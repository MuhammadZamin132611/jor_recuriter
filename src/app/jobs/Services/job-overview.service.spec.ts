import { TestBed } from '@angular/core/testing';

import { JobOverviewService } from './job-overview.service';

describe('JobOverviewService', () => {
  let service: JobOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
