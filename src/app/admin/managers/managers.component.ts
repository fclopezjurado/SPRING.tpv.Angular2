/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component} from '@angular/core';
import {MANAGERS} from '../admin.config'
import {ROLE_MANAGER} from '../../app.config'

@Component({
    templateUrl: './managers.component.html'
})
export class ManagersComponent {
    usersType: string;
    role: string;

    constructor() {
        this.usersType = MANAGERS;
        this.role = ROLE_MANAGER;
    }
}