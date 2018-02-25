import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LetterClass } from '../../letter';
import { StoreService } from '../../../store.service';
import { MaillistComponent } from '../maillist.component';

@Component({
  selector: 'app-singlemail',
  templateUrl: './singlemail.component.html',
  styleUrls: ['./singlemail.component.css']
})
export class SinglemailComponent implements OnInit {
  @Input() mail: LetterClass;
  @Output() opened: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  public curMail: LetterClass = new LetterClass('', '', '', '', '');

  constructor(private _router: Router,
              public maillist: MaillistComponent,
              private _storeService: StoreService) {}

  ngOnInit() {
    this.curMail._id = this.mail._id;
    this.curMail.to = this.mail.to;
    this.curMail.subject = this.mail.subject;
    this.curMail.body = this.mail.body;
    this.curMail.mailbox = this.mail.mailbox;
  }

  onClick() {
    this._storeService.setLet( this.curMail );
    this._storeService.setBFlag( true );

    this.opened.emit(); // emit to user.component
    this._router.navigate( ['/user', {outlets: {body: ['body']}}] );
  }

  delete() {
    this.deleted.emit();
  }
}

