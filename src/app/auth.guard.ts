import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _isAuth = false;

  constructor ( private _authService: AuthService,
                private _router: Router ) {
  }

  public canActivate() {
    this._isAuth = this._authService.isAuthorized();
    if ( !this._isAuth ) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
