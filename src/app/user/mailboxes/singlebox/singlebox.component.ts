import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-singlebox',
  templateUrl: './singlebox.component.html',
  styleUrls: ['./singlebox.component.css']
})
export class SingleboxComponent implements OnInit {
  @Input() mailbox: any;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosen: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() { }

  delete(mailbox) {
    this.deleted.emit(mailbox._id);
  }

  choose() {
    this.mailbox.class = { 'selected': true };
    this.chosen.emit(this.mailbox);
  }

}
