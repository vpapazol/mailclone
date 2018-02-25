import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BoxService } from '../box.service';
import { MailService } from '../mail.service';
import { StoreService } from '../store.service';
import { LetterClass } from './letter';
import { MailboxesComponent } from './mailboxes/mailboxes.component';
import { MaillistComponent } from './maillist/maillist.component';
import { BodyComponent } from './body/body.component';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public mailboxes;
  public mails: Array<LetterClass>;
  public boxid = '';
  public boxname = 'choose the mailbox';
  public bodyFlag: Boolean = false;
  public addrFlag: Boolean = false;
  public mailFlag: Boolean = false;
  private _id: string;
  private _preBox: any;

  constructor(private _boxService: BoxService,
              private _mailService: MailService,
              private _storeService: StoreService,
              private _router: Router ) {}

  ngOnInit() {
    this._boxService.getAll().subscribe( mailboxes => {
                      this.mailboxes = mailboxes;
                      this.mailboxes.class = '';
                    });

    this.bodyFlag = this._storeService.getBFlag();
    this.addrFlag = this._storeService.getAFlag();
    this.mailFlag = this._storeService.getMFlag();
    this._router.navigate( ['/user', {outlets: {boxes: ['boxes'], addresses: ['addresses'], letters: ['mails']}}] );
  }

  onDelete(curBox) {
    this._boxService.removeBox( curBox ).subscribe(
                      users => {
                        this.ngOnInit();
                        console.log('success ' + users);
                      },
                      error => {
                        console.log('error ' + error);
                      });
  }

  onChoice( curBox ) {
    this._preBox = this._boxService.setSelection( curBox );
    this._preBox.class = { 'selected': false };
    this.boxname = curBox.title;
    this.boxid = curBox._id;

    this._mailService.getAll().subscribe( (mails: Array<LetterClass>) => {
      this.mails = mails.filter(mail => mail.to === this.boxname);
    });
  }

  onOpen() {
    this.bodyFlag = this._storeService.getBFlag();
  }

  onClose() {
    this.bodyFlag = this._storeService.getBFlag();
  }

  onEditAddr() {
    this.addrFlag = this._storeService.getAFlag();
  }

  onCloseEdit() {
    this.addrFlag = this._storeService.getAFlag();
  }

  onNewMail() {
    this.mailFlag = true;
    this._storeService.setMFlag( true );

    this._router.navigate( ['/user', {outlets: {mail: ['mail']}}] );
  }

  onCloseMail() {
    this.mailFlag = this._storeService.getMFlag();
  }
}
