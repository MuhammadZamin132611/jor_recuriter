import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarComponent ],
      providers: [ BreakpointObserver ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values set', () => {
    expect(component.show).toBe(false);
    expect(component.sidebar).toBe(true);
    expect(component.mobile).toBe(false);
    expect(component.currentpage).toBe(2);
    expect(component.currentRoute).toBeFalsy();
  });

  it('click method should toggle sidebar and log outputs', () => {
    spyOn(console, 'log');
    component.click();
    expect(component.sidebar).toBe(false);
    expect(console.log).toHaveBeenCalledWith(component.sidebar);
    expect(console.log).toHaveBeenCalledWith(192);
    expect(console.log).toHaveBeenCalledWith(`Web ${Breakpoints.Web}`);
  });

  it('ngOnInit() should initialize component', () => {
    expect(component).toBeTruthy();
  });
});
