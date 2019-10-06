import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';
// import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnChanges {

  statusValues = [ 'prospective', 'current', 'non-active' ];

  @Input()
  customer: Customer;

  selectedStatus: string;

  constructor(private customerService: CustomerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customer'].currentValue) {
      this.selectedStatus = this.customer.status;
    }
  }

  onCustomerStatusChange(status: string) {
    this.selectedStatus = status;
  }

  submitCustomerStatus() {
    this.customer.status = this.selectedStatus;
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  addNote = (note: string) => {
    this.customer.notes.push(note);
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  updateNote = (note: string, index: number) => {
    this.customer.notes[index] = note;
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

  deleteNote = (index: number) => {
    this.customer.notes.splice(index, 1);
    this.customerService.updateCustomer(this.customer).subscribe(
      customer => this.customer = customer
    );
  }

}
