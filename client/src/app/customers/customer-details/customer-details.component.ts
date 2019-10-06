// customer-details.component.ts
// Component providing a detailed view of a customer's information. This component also
// allows editing of the customer's status and notes on the customer.

import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnChanges {

  // TODO: implement as enum instead of array of strings
  statusValues = [ 'prospective', 'current', 'non-active' ];

  @Input()
  customer: Customer;

  selectedStatus: string;

  constructor(private customerService: CustomerService) { }

  ngOnChanges(changes: SimpleChanges) {
    // Initialize the status dropdown with the customer's current status
    if (changes['customer'].currentValue) {
      this.selectedStatus = this.customer.status;
    }
  }

  // Change the customer's selected status.
  onCustomerStatusChange(status: string) {
    this.selectedStatus = status;
  }

  // Submit a requested change to the customer's status
  submitCustomerStatus() {
    this.customer.status = this.selectedStatus;

    // Update the customer in the backend
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  // Add a note to the customer's information
  addNote = (note: string) => {
    this.customer.notes.push(note);

    // Submit permanent update to the customer
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  // Update an existing note
  updateNote = (note: string, index: number) => {
    this.customer.notes[index] = note;
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  // Delete an existing note
  deleteNote = (index: number) => {
    this.customer.notes.splice(index, 1);
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

}
