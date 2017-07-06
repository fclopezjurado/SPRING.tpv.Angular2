/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {USERS_URI, MANAGERS} from '../admin.config'
import {ROLE_MANAGER} from '../../app.config'

@Component({
    templateUrl: './managers.component.html'
})
export class ManagersComponent {
    endpoint: string;
    usersType: string;
    role: string;

    constructor() {
        this.endpoint = USERS_URI;
        this.usersType = MANAGERS;
        this.role = ROLE_MANAGER;
    }
}