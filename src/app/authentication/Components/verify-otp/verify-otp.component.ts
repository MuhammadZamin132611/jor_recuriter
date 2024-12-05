
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { IUser } from '../../Models/auth.model';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  @ViewChild('secondInput') secondInput!: ElementRef;

  submitted: boolean = false;
  loading: boolean;
  user: IUser;
  userForm!: FormGroup;


  ///////////////////////////////////////////////////////
  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();
  ///////////////////////////////////////////////////////
  constructor(private router: Router,private activatedRoute:ActivatedRoute,
    private AuthService: AuthenticationService, private Account: AccountService) {
    this.loading = false;
    this.user = {} as IUser;
    
  }
  

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let email = params['email'];
      this.user.email = email;
      this.AuthService.forgotPassword(this.user).then(() => {
        console.log("reset sent....");
      }).catch(error=>{
        console.log("default error:",error.code);
      })
    })
    





    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')]),

    })
  }
public resetPassword():void{
  this.AuthService.forgotPasswordSubmit(this.user).then((resp)=>{
    this.router.navigate(['/sign-in']);
  })
}

  otp: string = '';
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "", inputStyles: { width: "100px", height: "50px",  }, };
  // showPassword: boolean = false;
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.changetype = !this.changetype;
  }

  focusSecondInput(): void {
    // Focus on the second input field using ElementRef
    this.secondInput.nativeElement.focus();

  }
  // 
  password: any;
  showPassword: boolean = false;
  changetype: boolean = true;






  // 

  get f() {
    return this.userForm.controls;
  }

  submitt() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    else {
      this.signIn();
    }
  }
  public signIn(): void {
    this.loading = true;
    this.busy_.next(true);
    console.log(this.user.email);

    this.AuthService.signIn(this.user)
      .then(() => {
        console.log('hello')

        this.getcurrentuser();

      }).catch(() => {
        this.loading = false;
        this.errorMessage_.next('Incorrect password or email');
        this.busy_.next(false);

        setTimeout(() => {
          this.errorMessage_.next('')
        }, 3000);
      });
  }
  
  onOtpChange(otp: string) {
    this.otp = otp;
    this.user.code = this.otp;
  };
  getcurrentuser() {
    this.busy_.next(true);
    this.AuthService.getUser().then(data => {
      console.log(data)
      if (data = '') {

      }
      else {
        this.getAccountDetails();
      }
    })
  }

  // getAccountDetails() {
  //   this.Account.getAccount(this.user.email).subscribe((res: any) => {
  //     console.log(res)
  //     localStorage.setItem('accountId', res);
  //     this.busy_.next(false);
  //     this.router.navigate(['/dashboard'])
  //   })
  // }

  getAccountDetails() {
    this.Account.getUpdatedAccount(this.user.email).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('accountId', res.accountId);
      this.busy_.next(false);
      this.router.navigate(['/dashboard'])
    })
  }

}