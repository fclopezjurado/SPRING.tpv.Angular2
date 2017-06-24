/**
 * Created by fran lopez on 15/05/2017.
 */

import {Component, EventEmitter} from '@angular/core';
import {
    User,
    MOBILE_ATTRIBUTE_NAME,
    USERNAME_ATTRIBUTE_NAME,
    DNI_ATTRIBUTE_NAME,
    EMAIL_ATTRIBUTE_NAME
} from '../../../../shared/models/user.model';
import {MdDialog} from '@angular/material';
import {UserDetailsDialog} from '../details/details.component';
import {CapitalizePipe} from '../../../../shared/pipes/capitalize.pipe';

@Component({
    selector: 'results',
    inputs: ['results'],
    outputs: ['onSelectedUser', 'onModifiedUser'],
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent {
    results: User[];
    headers: Object;
    onSelectedUser: EventEmitter<User>;
    onModifiedUser: EventEmitter<User>;
    capitalizePipe: CapitalizePipe;

    constructor(private userDetailsDialog: MdDialog) {
        this.onSelectedUser = new EventEmitter();
        this.onModifiedUser = new EventEmitter();
        this.capitalizePipe = new CapitalizePipe();
        this.headers = [{name: this.capitalizePipe.transform(MOBILE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(USERNAME_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(DNI_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(EMAIL_ATTRIBUTE_NAME, false)}
        ]
    }

    onActivate(selection: any) {
        this.onSelectedUser.emit(selection.row);

        let dialogRef = this.userDetailsDialog.open(UserDetailsDialog, {data: {user: selection.row}});
        dialogRef.afterClosed().subscribe(user => {
            this.onModifiedUser.emit(user);
        });
    }
}