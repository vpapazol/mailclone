import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user.component';
import { BoxService } from '../../box.service';


@Component({
  selector: 'app-mailboxes',
  templateUrl: './mailboxes.component.html',
  styleUrls: ['./mailboxes.component.css']
})
export class MailboxesComponent implements OnInit {

  constructor(public user: UserComponent,
              private _box: BoxService) {}

  ngOnInit() {
  }

  onDelete( curId ) {
    this._box.removeBox( curId ).subscribe(
          users => {
            console.log('success' + users);
          },
          error => {
            console.log('error ' + error);
          });
  }

}
