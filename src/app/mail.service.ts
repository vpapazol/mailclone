import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MailService {
  private _mailID;
  private _mailboxID;
  private _date;

  constructor(private _http: HttpClient) {}

  public getAll() {
    return this._http.get(`http://test-api.javascript.ru/v1/vitsavinov/letters`);
  }

  public removeMail(_id) {
    return this._http.delete(`http://test-api.javascript.ru/v1/vitsavinov/letters/${_id}`,
      { responseType: 'text' });
  }

  public addMail( _id, _to, _subject, _body ) {
    return this._http.post(`http://test-api.javascript.ru/v1/vitsavinov/letters`,
                    { 'mailbox': _id,
                      'subject': _subject,
                      'body': _body,
                      'to': _to
                    });
  }
}
