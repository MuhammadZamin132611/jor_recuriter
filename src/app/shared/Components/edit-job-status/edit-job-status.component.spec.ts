import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobStatusComponent } from './edit-job-status.component';

describe('EditJobStatusComponent', () => {
  let component: EditJobStatusComponent;
  let fixture: ComponentFixture<EditJobStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
