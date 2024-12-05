import { TestBed } from '@angular/core/testing';

import { ProfileSearchService } from './profile-search.service';

describe('ProfileSearchService', () => {
  let service: ProfileSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
