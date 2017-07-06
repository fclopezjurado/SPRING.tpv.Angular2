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
import {Page} from '../../models/page.model'
import {MdDialog} from '@angular/material';
import {UserDetailsDialog} from '../details/details.component';
import {CapitalizePipe} from '../../../../shared/pipes/capitalize.pipe';

@Component({
    selector: 'results',
    inputs: ['results', 'page'],
    outputs: ['onSelectedUser', 'onModifiedUser', 'onChangePage'],
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent {
    results: User[];
    headers: Object;
    onSelectedUser: EventEmitter<User>;
    onModifiedUser: EventEmitter<User>;
    onChangePage: EventEmitter<Page>;
    capitalizePipe: CapitalizePipe;
    page: Page;

    constructor(private userDetailsDialog: MdDialog) {
        this.onSelectedUser = new EventEmitter();
        this.onModifiedUser = new EventEmitter();
        this.onChangePage = new EventEmitter();
        this.capitalizePipe = new CapitalizePipe();
        this.headers = [{name: this.capitalizePipe.transform(MOBILE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(USERNAME_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(DNI_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(EMAIL_ATTRIBUTE_NAME, false)}
        ]
    }

    changePage(page: any) {
        this.page.pageNumber = page.offset;
        this.onChangePage.emit(this.page);
    }

    onActivate(selection: any) {
        this.onSelectedUser.emit(selection.row);

        const dialogRef = this.userDetailsDialog.open(UserDetailsDialog, {data: {user: selection.row}});
        dialogRef.afterClosed().subscribe(user => {
            this.onModifiedUser.emit(user);
        });
    }
}