import { Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

export const appRoutes: Routes = [
    {
        path: 'customers',
        component: CustomerListComponent
    }
];
