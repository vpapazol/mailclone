import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactClass } from '../contact';
import { UserComponent } from '../user.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { StoreService } from '../../store.service';
import { ContactService } from '../../contact.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contact: ContactClass = new ContactClass('', '', '', '', '', '');
  public nameControl: FormControl;
  public emailControl: FormControl;
  private _validFlag: Boolean = true;

  constructor(private _router: Router,
              public userComponent: UserComponent,
              private _addresses: AddressesComponent,
              private _contactService: ContactService,
              private _storeService: StoreService) { }

  ngOnInit() {
    this.contact = this._storeService.getAddr();

    this.nameControl = new FormControl(this.contact.fullName, [Validators.required]);
    this.nameControl.valueChanges.subscribe( (value) => console.log(value) );
    this.nameControl.statusChanges.subscribe( (status) => {
          if ( status === 'INVALID') {
            this._validFlag = false;
            alert( 'The NAME is required' );
          } else {
            this._validFlag = true;
          }
          console.log( status ); });

    this.emailControl = new FormControl(this.contact.email, [Validators.required, emailValidator]);
    this.emailControl.valueChanges.subscribe( (value) => console.log(value) );
    this.emailControl.statusChanges.subscribe( (status) => {
          if ( status === 'INVALID') {
            this._validFlag = false;
            alert( 'E-mail must have a sign `@` in address' );
          } else {
            this._validFlag = true;
          }
          console.log( status ); });
  }

  onSave(name, email) {
    if (this._validFlag) {
      this._contactService.editContact( this.contact._id, name, email ).subscribe(
        contact => {
          console.log('success ' + contact);
        },
        error => {
          console.log('error ' + error);
        });
    }

    this._storeService.setAFlag( false );
    this.userComponent.onCloseEdit();
    this._router.navigate( ['/user', {outlets: {letters: ['mails']}}] );
  }

  onCancel() {
    this._storeService.setAFlag( false );

    this.userComponent.onCloseEdit();
    this._router.navigate( ['/user', {outlets: {letters: ['mails']}}] );
  }

}

function emailValidator( formControl: FormControl ) {
  if ( formControl.value.indexOf('@') === -1 ) {
    return { emailValidator: {message: 'E-mail must have a sign `@` in address'} };
  }
  return null;
}
