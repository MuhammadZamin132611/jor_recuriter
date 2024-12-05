import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllActiveTeamComponent } from './view-all-active-team.component';

describe('ViewAllActiveTeamComponent', () => {
  let component: ViewAllActiveTeamComponent;
  let fixture: ComponentFixture<ViewAllActiveTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllActiveTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllActiveTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
