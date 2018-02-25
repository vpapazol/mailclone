import { Component, OnInit } from '@angular/core';
import { BoxService } from '../../../box.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserComponent } from '../../user.component';

@Component({
  selector: 'app-addbox',
  templateUrl: './addbox.component.html',
  styleUrls: ['./addbox.component.css']
})
export class AddboxComponent implements OnInit {
  public nameControl: FormControl;
  private _validFlag: Boolean = true;

  constructor(private _boxService: BoxService,
              private _user: UserComponent) {}

  ngOnInit() {
    this.nameControl = new FormControl('john@mail.ru', [Validators.required, emailValidator]);
    this.nameControl.valueChanges.subscribe( (value) => console.log(value) );
    this.nameControl.statusChanges.subscribe( (status) => {
      if ( status === 'INVALID') {
        this._validFlag = false;
        alert( 'E-mail must have a sign `@` in address' );
      } else {
        this._validFlag = true;
      }
      console.log( status ); });
  }

  addBox( name: string ) {
    if (this._validFlag) {
      this._boxService.addBox( name ).subscribe(
            boxes => {
              this._user.ngOnInit();
              console.log('success ' + boxes);
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
