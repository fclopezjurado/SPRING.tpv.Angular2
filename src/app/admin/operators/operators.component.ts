/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {USERS_URI, OPERATORS} from '../admin.config'
import {ROLE_OPERATOR} from '../../app.config';

@Component({
    templateUrl: './operators.component.html'
})
export class OperatorsComponent {
    endpoint: string;
    usersType: string;
    role: string;

    constructor() {
        this.endpoint = USERS_URI;
        this.usersType = OPERATORS;
        this.role = ROLE_OPERATOR;
    }
}