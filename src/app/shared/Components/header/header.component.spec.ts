// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HeaderComponent } from './header.component';

import { HeaderComponent } from './header.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ BreakpointObserver ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sidebar variable to true in ngOnInit', () => {
    expect(component.sidebar).toBeTrue();
  });

  it('should initialize show variable to false in ngOnInit', () => {
    expect(component.show).toBeFalse();
  });

  it('should initialize mobile variable to false in ngOnInit', () => {
    expect(component.mobile).toBeFalse();
  });

  it('should toggle sidebar variable on click function', () => {
    const currentSidebarState = component.sidebar;
    component.click();
    expect(component.sidebar).not.toBe(currentSidebarState);
  });

  it('should set sidebar variable to the value passed in ShowSidebarShow function', () => {
    const currentSidebarState = component.sidebar;
    component.ShowSidebarShow(!currentSidebarState);
    expect(component.sidebar).not.toBe(currentSidebarState);
  });
});
