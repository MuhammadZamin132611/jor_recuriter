import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/authentication/Models/account.model';
import { AccountService } from 'src/app/authentication/Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  accountId: string = '';
  accountDetails: Account=new Account();
  constructor(private accountService: AccountService,private router:Router,) { 
    this.accountId = JSON.parse(JSON.stringify(localStorage.getItem('accountId')))
  }

  ngOnInit(): void {
    this.getAccountDetails()
    
  }
  getAccountDetails() {
    this.accountService.getAccountDetails(this.accountId).subscribe(res => {
      this.accountDetails = res;
    })
  }

}
