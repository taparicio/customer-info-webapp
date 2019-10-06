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
  sortDirection = 'ASC';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getCustomers();
  }

  onSelect(customer: Customer) {
    console.log('selected customer');
    this.selectedCustomer = customer;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers.sort(this.sortCustomers));
  }

  changeSortDirection() {
    this.sortDirection = (this.sortDirection === 'ASC' ? 'DESC' : 'ASC');
    this.customers = this.customers.sort(this.sortCustomers);
  }

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
