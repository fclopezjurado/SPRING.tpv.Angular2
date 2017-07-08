/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {OPERATORS} from '../admin.config'
import {ROLE_OPERATOR} from '../../app.config';

@Component({
    templateUrl: './operators.component.html'
})
export class OperatorsComponent {
    usersType: string;
    role: string;

    constructor() {
        this.usersType = OPERATORS;
        this.role = ROLE_OPERATOR;
    }
}