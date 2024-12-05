import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchResultComponent } from './view-search-result.component';

describe('ViewSearchResultComponent', () => {
  let component: ViewSearchResultComponent;
  let fixture: ComponentFixture<ViewSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
