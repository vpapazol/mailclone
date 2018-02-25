import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../contact.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressesComponent } from '../addresses.component';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
  public nameControl: FormControl;
  public emailControl: FormControl;
  private _validFlag: Boolean = true;

  constructor(private _contactService: ContactService,
              private _addresses: AddressesComponent) {}

  ngOnInit() {
    this.nameControl = new FormControl('John Doe', [Validators.required]);
    this.nameControl.valueChanges.subscribe( (value) => console.log(value) );
    this.nameControl.statusChanges.subscribe( (status) => {
          if ( status === 'INVALID') {
            this._validFlag = false;
            alert( 'The NAME is required' );
          } else {
            this._validFlag = true;
          }
          console.log( status ); });

    this.emailControl = new FormControl('john@mail.ru', [Validators.required, emailValidator]);
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

  addContact( name: string, email: string ) {
    if (this._validFlag) {
        this._contactService.addContact( name, email ).subscribe(
          contact => {
            this._addresses.ngOnInit();
            console.log('success ' + contact);
          },
          error => {
            console.log('error ' + error);
          });
    }
  }
}

function emailValidator( formControl: FormControl ) {
  if ( formControl.value.indexOf('@') === -1 ) {
    return { emailValidator: {message: 'E-mail must have a sign `@` in address'} };
  }
  return null;
}
