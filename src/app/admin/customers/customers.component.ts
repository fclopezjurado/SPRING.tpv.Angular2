/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {CUSTOMERS_URI, CUSTOMERS} from '../admin.config'

@Component({
    templateUrl: './customers.component.html'
})
export class CustomersComponent {
    endpoint: string;
    usersType: string;

    constructor() {
        this.endpoint = CUSTOMERS_URI;
        this.usersType = CUSTOMERS;
    }
}