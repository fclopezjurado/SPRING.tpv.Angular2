/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {MANAGERS_URI, MANAGERS} from '../admin.config'

@Component({
    templateUrl: './managers.component.html'
})
export class ManagersComponent {
    endpoint: string;
    usersType: string;

    constructor() {
        this.endpoint = MANAGERS_URI;
        this.usersType = MANAGERS;
    }
}