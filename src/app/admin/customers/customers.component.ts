/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {USERS_URI, CUSTOMERS} from '../admin.config'
import {ROLE_CUSTOMER} from '../../app.config'

@Component({
    templateUrl: './customers.component.html'
})
export class CustomersComponent {
    endpoint: string;
    usersType: string;
    role: string;

    constructor() {
        this.endpoint = USERS_URI;
        this.usersType = CUSTOMERS;
        this.role = ROLE_CUSTOMER;
    }
}