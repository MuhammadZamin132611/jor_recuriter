import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountConfig } from '../Config/account.config';
import { Account } from '../Models/account.model';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  router: any;

  constructor(private http:HttpClient,private authConfig:AccountConfig) { }


  getAccount(userEmail:string){

    return this.http.get(environment.jobService+this.authConfig.getAccount+`${userEmail}`)
  }

  getUpdatedAccount(email:string){
    return this.http.get('https://account-handle-service.dev.jobcheck.in/accounthandleservice/accounts/details/'+`${email}`)
  
  }

  getAccountDetails(accountId:string){
return this.http.get<Account>(environment.usermanagementService+this.authConfig.accountDetails+`${accountId}`)
  }

  // async siginOut(){
  //   await this.auth.signOut();
  //   GoogleAuth.signOut();
  //   FacebookLogin.logout();
  //   this.logoutlinkedin();
 
  //  // GoogleAuth.signOut();
  //  localStorage.removeItem('fromjobcheck');
  //  localStorage.clear();
  //  console.clear()
  //  sessionStorage.clear();
  //  this.router.navigate(['/']);
    
  // }
  public async signOut() {
    await Auth.signOut();
  }
}
