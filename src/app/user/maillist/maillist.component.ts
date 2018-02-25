import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user.component';
import { BoxService } from '../../box.service';
import { MailService } from '../../mail.service';

@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.component.html',
  styleUrls: ['./maillist.component.css']
})
export class MaillistComponent implements OnInit {
  private _id: string;

  constructor(private _boxService: BoxService,
              private _mailService: MailService,
              public userComponent: UserComponent) {}

  ngOnInit() {
    if ( this.userComponent.boxid ) {
      this.userComponent.onChoice( this._boxService.getSelection() );
    }
  }

  onDelete(curMail) {
    this._id = curMail._id;
    this._mailService.removeMail(this._id).subscribe(
      mails => {
        this.ngOnInit();
        console.log('success ' + mails);
      },
      error => {
        console.log('error ' + error);
      });
  }

}
