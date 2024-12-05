import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication/Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  async canActivate(): Promise<boolean> {

    if (await this.authService.isAuthenticated() ) {
      return true;
    }

    this.router.navigate(['']);

    return false;

  }
}

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  async canActivate(): Promise<boolean> {

    if (!await this.authService.isAuthenticated() ) {
      return true;
    }

    this.router.navigate(['dashboard']);

    return false;

  }
}

