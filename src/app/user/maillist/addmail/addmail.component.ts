import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LetterClass } from '../../letter';
import { UserComponent } from '../../user.component';
import { StoreService } from '../../../store.service';
import { MailService } from '../../../mail.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmail',
  templateUrl: './addmail.component.html',
  styleUrls: ['./addmail.component.css']
})
export class AddmailComponent implements OnInit {
  public letter: LetterClass = new LetterClass('', '', '', '', '');
  public toControl: FormControl;
  public subjControl: FormControl;
  public bodyControl: FormControl;
  private _validFlag: Boolean = false;

  constructor(private _router: Router,
              public userComponent: UserComponent,
              private _mailService: MailService,
              private _storeService: StoreService) {}

  ngOnInit() {
      this.toControl = new FormControl('', [Validators.required, emailValidator]);
      this.toControl.valueChanges.subscribe( (value) => console.log(value) );
      this.toControl.statusChanges.subscribe( (status) => {
            if ( status === 'INVALID') {
              this._validFlag = false;
              alert( 'E-mail must have a sign `@` in address' );
            } else {
              this._validFlag = true;
            }
            console.log( status ); });

      this.subjControl = new FormControl('');
      this.subjControl.valueChanges.subscribe( (value) => console.log(value) );
      this.subjControl.statusChanges.subscribe( (status) => console.log( status ) );

      this.bodyControl = new FormControl('');
      this.bodyControl.valueChanges.subscribe( (value) => console.log(value) );
      this.bodyControl.statusChanges.subscribe( (status) => console.log( status ) );
    }

    onSave(_id, _to = '', _subj = '', _body = '') {
      if (this._validFlag) {
        this._mailService.addMail( _id, _to, _subj, _body ).subscribe(
          contact => {
            console.log('success ' + contact);
          },
          error => {
            console.log('error ' + error);
          });
      } else {
        alert( 'New letter was not sent!' );
      }

      this._storeService.setMFlag( false );
      this.userComponent.onCloseMail();
      this._router.navigate( ['/user', {outlets: {letters: ['mails']}}] );
    }

    onCancel() {
      this._storeService.setMFlag( false );

      this.userComponent.onCloseMail();
      this._router.navigate( ['/user', {outlets: {letters: ['mails']}}] );
    }
  }

  function emailValidator( formControl: FormControl ) {
    if ( formControl.value.indexOf('@') === -1 ) {
      return { emailValidator: {message: 'E-mail must have a sign `@` in address'} };
    }
    return null;
  }
