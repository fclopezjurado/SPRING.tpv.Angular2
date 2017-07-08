/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {CUSTOMERS} from '../admin.config'
import {ROLE_CUSTOMER} from '../../app.config'

@Component({
    templateUrl: './customers.component.html'
})
export class CustomersComponent {
    usersType: string;
    role: string;

    constructor() {
        this.usersType = CUSTOMERS;
        this.role = ROLE_CUSTOMER;
    }
}