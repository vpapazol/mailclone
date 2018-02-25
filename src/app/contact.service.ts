import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactClass } from './user/contact';

@Injectable()
export class ContactService {

  constructor(private _http: HttpClient) { }

  public getAll() {
    return this._http.get('http://test-api.javascript.ru/v1/vitsavinov/users');
  }

  public removeContact(_id) {
    return this._http.delete(`http://test-api.javascript.ru/v1/vitsavinov/users/${_id}`,
         { responseType: 'text' });
  }

  public addContact( _name, _email ) {
    return this._http.post( `http://test-api.javascript.ru/v1/vitsavinov/users`,
                { 'fullName': _name,
                'avatarUrl': '',
                'birthdate': '',
                'address': '',
                'email': _email
              });
  }

  public editContact( _id, _name, _email ) {
    return this._http.patch( `http://test-api.javascript.ru/v1/vitsavinov/users/${_id}`,
                { 'fullName': _name,
                'avatarUrl': '',
                'birthdate': '',
                'address': '',
                'email': _email
              });
  }

}
