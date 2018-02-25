import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContactClass } from '../../contact';
import { StoreService } from '../../../store.service';

@Component({
  selector: 'app-singlecontact',
  templateUrl: './singlecontact.component.html',
  styleUrls: ['./singlecontact.component.css']
})
export class SinglecontactComponent implements OnInit {
  @Input() contact: ContactClass;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() edited: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _router: Router,
              private _storeService: StoreService) {}

  ngOnInit() {
  }

  delete( _id ) {
    this.deleted.emit( _id );
  }

  editContact( contact ) {
    this._storeService.setAddr( contact );
    this._storeService.setAFlag( true );

    this.edited.emit();
    this._router.navigate( ['/user', {outlets: {addr: ['addr']}}] );
  }
}
