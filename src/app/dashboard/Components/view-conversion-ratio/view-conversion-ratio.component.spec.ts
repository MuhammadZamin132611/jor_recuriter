import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConversionRatioComponent } from './view-conversion-ratio.component';

describe('ViewConversionRatioComponent', () => {
  let component: ViewConversionRatioComponent;
  let fixture: ComponentFixture<ViewConversionRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConversionRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConversionRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
