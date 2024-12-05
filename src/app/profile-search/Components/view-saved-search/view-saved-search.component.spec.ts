import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedSearchComponent } from './view-saved-search.component';

describe('ViewSavedSearchComponent', () => {
  let component: ViewSavedSearchComponent;
  let fixture: ComponentFixture<ViewSavedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSavedSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSavedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
