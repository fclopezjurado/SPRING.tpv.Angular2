/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component, OnInit} from '@angular/core';
import {HTTPService} from '../../../../shared/services/http.service';
import {TPVHTTPError} from '../../../../shared/models/tpv-http-error.model';
import {ToastService} from '../../../../shared/services/toast.service';
import {
    User, MOBILE_ATTRIBUTE_NAME,
    EMAIL_ATTRIBUTE_NAME,
    IDENTIFICATION_ATTRIBUTE_NAME
} from '../../../../shared/models/user.model';
import {USER_MOBILE_PATH, DNI_PATH, EMAIL_PATH} from '../../../admin.config';
import {ROLE_ATTRIBUTE_NAME} from '../../../../shared/models/session.model';
import {MdDialog} from '@angular/material';
import {NewUserDialog} from '../new-user/new-user.component';
import {isNull, isUndefined} from "util";
import {URLSearchParams} from "@angular/http";
import {Page, SIZE_ATTRIBUTE_NAME, PAGE_ATTRIBUTE_NAME, MEDIUM_PAGE_SIZE} from "../../models/page.model";

@Component({
    selector: 'users',
    inputs: ['endpoint', 'usersType', 'role'],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    results = [];
    endpoint: string;
    usersType: string;
    selected: User;
    role: string;
    page: Page;

    constructor(private httpService: HTTPService, private toastService: ToastService,
                private newUserDialog: MdDialog) {
        this.selected = new User();
        this.page = new Page(MEDIUM_PAGE_SIZE);
    }

    ngOnInit(): void {
        const params = new URLSearchParams();
        params.set(ROLE_ATTRIBUTE_NAME, this.role);
        params.set(SIZE_ATTRIBUTE_NAME, this.page.size.toString());
        params.set(PAGE_ATTRIBUTE_NAME, this.page.pageNumber.toString());

        this.httpService.get(this.endpoint, null, params).subscribe(
            results => this.loadResultsFound(results),
            error => this.handleError(error)
        );
    }

    loadResultsFound(response: any) {
        this.page.size = response.size;
        this.page.totalElements = response.totalElements;
        this.page.totalPages = response.totalPages;
        this.page.pageNumber = response.number;
        this.results = response.content;
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting results from server', httpError.error);
    }

    openNewUserDialog() {
        const dialogRef = this.newUserDialog.open(NewUserDialog, {data: {endpoint: this.endpoint, role: this.role}});
        dialogRef.afterClosed().subscribe(user => {
            this.ngOnInit();
            console.log(user);
        });
    }

    onSelectedUser(user: User) {
        this.selected = user;
    }

    onModifiedUser(user: User) {
        if (!isUndefined(user) && !user.equals(this.selected)) {
            this.httpService.put(this.endpoint, user).subscribe(
                results => this.ngOnInit(),
                error => this.handleError(error)
            );
        }
    }

    onChangePage(page: Page) {
        this.page = page;
        this.ngOnInit();
    }

    onFilterUsers(user: User) {
        const params = new URLSearchParams();
        let fieldName: string = null;
        let fieldValue = null;
        let endpoint = this.endpoint;

        if (isNull(user)) {
            this.page = new Page(MEDIUM_PAGE_SIZE);
            this.ngOnInit();
        }
        else {
            if (!isNull(user.mobile) && (user.mobile.valueOf() > 0)) {
                fieldName = MOBILE_ATTRIBUTE_NAME;
                fieldValue = user.mobile;
                endpoint += USER_MOBILE_PATH;
            }
            else if (!isNull(user.dni) && (user.dni.length > 0)) {
                fieldName = IDENTIFICATION_ATTRIBUTE_NAME;
                fieldValue = user.dni;
                endpoint += DNI_PATH;
            }
            else if (!isNull(user.email) && (user.email.length > 0)) {
                fieldName = EMAIL_ATTRIBUTE_NAME;
                fieldValue = user.email;
                endpoint += EMAIL_PATH;
            }

            params.set(fieldName, fieldValue);
            params.set(ROLE_ATTRIBUTE_NAME, this.role);

            this.httpService.get(endpoint, null, params).subscribe(
                response => this.filterUser(response),
                error => this.handleError(error)
            );
        }
    }

    filterUser(response) {
        const users: User[] = [];

        if (!isUndefined(response.id)) {
            users.push(response);
            this.page.totalElements = users.length;
        }

        this.results = users;
    }
}