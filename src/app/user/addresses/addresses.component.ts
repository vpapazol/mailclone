import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../contact.service';
import { ContactClass } from '../contact';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  public contacts;
  private _id: string;

  constructor(private _contactService: ContactService,
              public userComponent: UserComponent) { }

  ngOnInit() {
    this._contactService.getAll().subscribe(contacts => this.contacts = contacts);
  }

  onDelete(curId) {
    this._id = curId;
    this._contactService.removeContact( this._id ).subscribe(
          users => {
            this.ngOnInit();
            console.log('success' + users);
          },
          error => {
            console.log('error ' + error);
          });
  }

}
