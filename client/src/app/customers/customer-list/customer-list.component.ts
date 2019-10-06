// customer-list.component.ts
// Component providing a selectable, filterable, and sortable list of customers via "SurName, FirstName".

import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];
  selectedCustomer: Customer;
  sortDirection = 'ASC'; // Start with names sorted ascending by LastName + FirstName

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    // Initialize the customer list
    this.getCustomers();
  }

  // User selected a customer to view
  onSelect(customer: Customer) {
    console.log('selected customer');
    this.selectedCustomer = customer;
  }

  // Get the customer list
  getCustomers() {
    // Use the customer service layer to get the list
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers.sort(this.sortCustomers));
  }

  // Change the direction of the customer list sort
  changeSortDirection() {
    this.sortDirection = (this.sortDirection === 'ASC' ? 'DESC' : 'ASC');
    this.customers = this.customers.sort(this.sortCustomers);
  }

  // Sort the customers by LastName then FirstName according to the chosen sort direction
  sortCustomers = (customer1: Customer, customer2: Customer) => {
    if (customer1.surName !== customer2.surName) {
        return customer1.surName < customer2.surName ?
          this.sortDirection === 'ASC' ? -1 : 1 :
          this.sortDirection === 'ASC' ? 1 : -1;
    }
    return customer1.firstName < customer2.firstName ?
      this.sortDirection === 'ASC' ? -1 : 1 :
      this.sortDirection === 'ASC' ? 1 : -1;
  }

}
