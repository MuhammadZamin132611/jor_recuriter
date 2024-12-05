
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { TermsAndConditionComponent } from './Components/terms-and-condition/terms-and-condition.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { NonAuthGuardService } from '../auth-guard.service';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './Components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent,canActivate:[NonAuthGuardService] },
  { path: 'terms-and-condition', component: TermsAndConditionComponent, },
  { path: '', redirectTo: 'sign-in' },
  { path: 'changepassword',component: ChangePasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent, },
  { path: 'verify-otp', component: VerifyOtpComponent, },
  { path: 'reset-password', component: ResetPasswordComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
