import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobActionsComponent } from './view-job-actions.component';

describe('ViewJobActionsComponent', () => {
  let component: ViewJobActionsComponent;
  let fixture: ComponentFixture<ViewJobActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
