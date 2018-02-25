import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoxService {
  private _curSelection = {};
  private _preBox = {};
  constructor(private _http: HttpClient) {}

  public getAll() {
    return this._http.get('http://test-api.javascript.ru/v1/vitsavinov/mailboxes');
  }

  public removeBox(_id) {
    return this._http.delete(`http://test-api.javascript.ru/v1/vitsavinov/mailboxes/${_id}`,
         { responseType: 'text' });
  }

  public addBox( _email ) {
    return this._http.post( `http://test-api.javascript.ru/v1/vitsavinov/mailboxes`, {'title': _email} );
  }

  public setSelection( _box ) {
    this._preBox = this._curSelection;
    this._curSelection = _box;
    return this._preBox;
  }

  public getSelection() {
    return this._curSelection;
  }

}
