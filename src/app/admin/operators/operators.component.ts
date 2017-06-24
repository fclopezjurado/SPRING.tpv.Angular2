/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {OPERATORS_URI, OPERATORS} from '../admin.config'

@Component({
    templateUrl: './operators.component.html'
})
export class OperatorsComponent {
    endpoint: string;
    usersType: string;

    constructor() {
        this.endpoint = OPERATORS_URI;
        this.usersType = OPERATORS;
    }
}