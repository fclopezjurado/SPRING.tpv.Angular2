/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component, OnInit} from '@angular/core';
import {HTTPService} from '../../../../shared/services/http.service';
import {TPVHTTPError} from '../../../../shared/models/tpv-http-error.model';
import {ToastService} from '../../../../shared/services/toast.service';
import {User} from '../../../../shared/models/user.model';
import {MdDialog} from '@angular/material';
import {NewUserDialog} from '../new-user/new-user.component';
import {isNull, isUndefined} from "util";

@Component({
    selector: 'users',
    inputs: ['endpoint', 'usersType'],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    results = [];
    endpoint: string;
    usersType: string;
    selected: User;

    constructor(private httpService: HTTPService, private toastService: ToastService,
                private newUserDialog: MdDialog) {
        this.selected = new User();
    }

    ngOnInit(): void {
        this.httpService.get(this.endpoint).subscribe(
            results => this.results = results.data,
            error => this.handleError(error)
        );
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting results from server', httpError.error);
    }

    loadResultsFound(results: User[]) {
        this.results = results;
    }

    openNewUserDialog() {
        let dialogRef = this.newUserDialog.open(NewUserDialog, {data: {endpoint: this.endpoint}});
        dialogRef.afterClosed().subscribe(user => {
            this.ngOnInit();
            console.log(user);
        });
    }

    onSelectedUser(user: User) {
        this.selected = user;
    }

    onModifiedUser(user: User) {
        if (isNull(user))
            this.httpService.delete(this.endpoint + '/' + this.selected.mobile).subscribe(
                results => this.ngOnInit(),
                error => this.handleError(error)
            );
        else if (!isUndefined(user) && !user.equals(this.selected)) {
            this.httpService.put(this.endpoint + '/' + user.id, user).subscribe(
                results => this.ngOnInit(),
                error => this.handleError(error)
            );
        }
    }
}