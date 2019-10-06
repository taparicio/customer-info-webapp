// customer.service.ts
// Provides the services for connecting to the Customer REST API.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Customer } from './models/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    apiServerUrl = 'http://localhost:8080';
    apiUrl = `${this.apiServerUrl}/api/customers`;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    // Handle HTTP API errors
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            // TODO: notify the user of the error that occurred

            // let the app keep running after error is handled
            return of(result as T);
        };
    }

    // GET all customers.
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.apiUrl).pipe(
            tap(_ => console.log('fetched customers')),
            catchError(this.handleError<Customer[]>('getCustomers', []))
        );
    }

    // GET a specific customer by the unique ID.
    getCustomer(id: string): Observable<Customer> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Customer>(url).pipe(
            tap(_ => console.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Customer>(`getCustomer id=${id}`))
        );
    }

    // PUT a customer update.
    // The given customer argument is the customer with the updated information.
    updateCustomer(customer: Customer) {
        return this.http.put<Customer>(`${this.apiUrl}/${customer._id}`, customer, this.httpOptions).pipe(
            tap(_ => console.log(`updated customer id=${customer._id}`)),
            catchError(this.handleError<any>('updateCustomer'))
        );
    }

}
