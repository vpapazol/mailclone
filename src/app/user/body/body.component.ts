import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LetterClass } from '../letter';
import { UserComponent } from '../user.component';
import { StoreService } from '../../store.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  public letter: LetterClass = new LetterClass('', '', '', '', '');

  constructor(private _router: Router,
              public userComponent: UserComponent,
              private _storeService: StoreService) {}

  ngOnInit() {
    this.letter = this._storeService.getLet();
  }

  onClick() {
    this._storeService.setBFlag( false );

    this.userComponent.onClose();
    this._router.navigate( ['/user', {outlets: {letters: ['mails']}}] );
  }

}
