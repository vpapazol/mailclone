import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _isAuth = false;

  constructor( private _router: Router ) {}

  public login() {
    this._isAuth = true;
    this._router.navigate(['/user']);
  }

  public logout() {
    this._isAuth = false;
  }

  public isAuthorized() {
    return this._isAuth;
  }

}
