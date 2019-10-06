// customer-note.component.ts
// Component allowing notes to be taken on the customer

import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.css']
})
export class CustomerNoteComponent implements OnInit {

  @Input()
  note: string;

  @Input()
  index: number;

  // Notifies of an added customer note
  @Input()
  addNoteHandler: Function;

  // Notifies of an update to a customer note
  @Input()
  updateNoteHandler: Function;

  // Notifies of a deleted customer note
  @Input()
  deleteNoteHandler: Function;

  editable = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  // Add the new note to the customer info
  addNote(note: string) {
    console.log(`adding note ${note}`);
    if (note && note.trim() !== '') {
      this.addNoteHandler(note);
    }
    this.note = '';
  }

  // Change the textbox to be editable
  editNote() {
    console.log(`editing ${this.index}`);
    this.editable = true;
  }

  // Save the edited text from the textbox
  saveNote(note: string) {
    console.log(`saving ${this.index} ${note}`);
    this.editable = false;
    this.updateNoteHandler(note, this.index);
  }

  // Delete the edited note
  deleteNote() {
    console.log(`deleting ${this.index}`);
    this.deleteNoteHandler(this.index);
  }

}
