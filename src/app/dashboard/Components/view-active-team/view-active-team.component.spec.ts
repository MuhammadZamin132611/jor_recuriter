import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActiveTeamComponent } from './view-active-team.component';

describe('ViewActiveTeamComponent', () => {
  let component: ViewActiveTeamComponent;
  let fixture: ComponentFixture<ViewActiveTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActiveTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActiveTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
