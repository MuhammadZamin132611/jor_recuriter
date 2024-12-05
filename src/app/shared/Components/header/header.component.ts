import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/authentication/Models/account.model';
import { AccountService } from 'src/app/authentication/Services/account.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  popupmodal: boolean = false;
  sidebar: boolean = false;
  show: boolean = false;
  mobile: boolean = false;
  accountId: string = '';
  accountDetails: Account = new Account();

  constructor(
    private responsive: BreakpointObserver,
    private accountService: AccountService,
    private router: Router,
    private auth:AuthenticationService
  ) {
    this.accountId = JSON.parse(
      JSON.stringify(localStorage.getItem('accountId'))
    );
  }
  ngOnInit() {
    this.getAccountDetails();
    this.sidebar = true;
    this.responsive.observe(Breakpoints.Small).subscribe((result) => {
      console.log('Web ' + Breakpoints.Web);
      if (result.matches) {
        this.sidebar = true;
        this.show = false;
        this.mobile = false;
        console.log(result.matches, 'screens matches HandsetLandscape');
      }
    });
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.sidebar = false;
        this.show = true;
        this.mobile = true;

        console.log(result.matches, 'screens matches HandsetLandscape');
      }
    });
    // this.getAccountDetails()
  }
  click() {
    this.sidebar = !this.sidebar;
    this.show = true;
    console.log(this.sidebar);

    console.log(192);
  }
  ShowSidebarShow(event: any) {
    this.sidebar = event;
  }

  // popupmodal: boolean = false;
  Qpop() {
    this.popupmodal = !this.popupmodal;
  }

  logout() {
    
      this.auth.signOut();
      this.router.navigate(['sign-in']);
      localStorage.clear();
    
  }

  getAccountDetails() {
    this.accountService.getAccountDetails(this.accountId).subscribe((res) => {
      this.accountDetails = res;
    });
  }
}
