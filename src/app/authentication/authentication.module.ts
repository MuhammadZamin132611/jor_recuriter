import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { TermsAndConditionComponent } from './Components/terms-and-condition/terms-and-condition.component';
import { AccountService } from './Services/account.service';
import { AccountConfig } from './Config/account.config';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';





@NgModule({
  declarations: [
    SignInComponent,
    TermsAndConditionComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  providers:[AccountService,AccountConfig],

})
export class AuthenticationModule { }
