import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDahsboardComponent } from './view-dahsboard.component';

describe('ViewDahsboardComponent', () => {
  let component: ViewDahsboardComponent;
  let fixture: ComponentFixture<ViewDahsboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDahsboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
