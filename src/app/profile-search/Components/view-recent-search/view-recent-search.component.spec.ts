import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecentSearchComponent } from './view-recent-search.component';

describe('ViewRecentSearchComponent', () => {
  let component: ViewRecentSearchComponent;
  let fixture: ComponentFixture<ViewRecentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
