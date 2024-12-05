import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Models/auth.model';
import { CognitoUser } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito1,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
     
    
    });
  }
  public forgotPasswordSubmit(user: IUser): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, user.password);
  }


  public forgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPassword(user.email);
  }


  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.name, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}
