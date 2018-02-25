import { Injectable } from '@angular/core';
import { LetterClass } from './user/letter';
import { ContactClass } from './user/contact';

@Injectable()
export class StoreService {
  private _curLetter: LetterClass;
  private _curContact: ContactClass;
  private _bodyFlag: Boolean;
  private _addrFlag: Boolean;
  private _mailFlag: Boolean;

  constructor() { }

  public getAddr() {
    return this._curContact;
  }

  public setAddr( contact ) {
    this._curContact = contact;
  }

  public getLet() {
    return this._curLetter;
  }

  public setLet( letter ) {
    this._curLetter = letter;
  }

  public getAFlag() {
    return this._addrFlag;
  }

  public setAFlag( newFlag ) {
    this._addrFlag = newFlag;
  }

  public getBFlag() {
    return this._bodyFlag;
  }

  public setBFlag( newFlag ) {
    this._bodyFlag = newFlag;
  }

  public getMFlag() {
    return this._mailFlag;
  }

  public setMFlag( newFlag ) {
    this._mailFlag = newFlag;
  }

}
