/**
 * Created by fran lopez on 30/05/2017.
 */

import {Component, Inject, OnInit} from '@angular/core';
import {User, MOBILE_ATTRIBUTE_NAME} from '../../../../shared/models/user.model';
import {Page, SIZE_ATTRIBUTE_NAME, PAGE_ATTRIBUTE_NAME, SMALL_PAGE_SIZE} from '../../models/page.model';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Ticket, REFERENCE_ATTRIBUTE_NAME, CREATED_DATE_ATTRIBUTE_NAME} from '../../models/ticket.model';
import {TPVHTTPError} from '../../../../shared/models/tpv-http-error.model';
import {ToastService} from '../../../../shared/services/toast.service';
import {MdDialog} from '@angular/material';
import {EditUserDialog} from '../edit-user/edit-user.component';
import {CapitalizePipe} from '../../../../shared/pipes/capitalize.pipe';
import {isUndefined} from "util";
import {HTTPService} from "../../../../shared/services/http.service";
import {URLSearchParams} from "@angular/http";
import {TICKETS_URI} from '../../../admin.config';

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class UserDetailsDialog implements OnInit {
    user: User;
    tickets: Ticket[];
    headers: Object;
    capitalizePipe: CapitalizePipe;
    page: Page;

    constructor(@Inject(MD_DIALOG_DATA) private data: { user: User },
                public dialogRef: MdDialogRef<UserDetailsDialog>, private httpService: HTTPService,
                private toastService: ToastService, private editUserDialog: MdDialog) {
        this.capitalizePipe = new CapitalizePipe();
        this.user = this.data.user;
        this.page = new Page(SMALL_PAGE_SIZE);
        this.headers = [{name: this.capitalizePipe.transform(REFERENCE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(CREATED_DATE_ATTRIBUTE_NAME, false)}
        ]
    }

    ngOnInit(): void {
        const params = new URLSearchParams();
        params.set(MOBILE_ATTRIBUTE_NAME, this.user.mobile.toString());
        params.set(SIZE_ATTRIBUTE_NAME, this.page.size.toString());
        params.set(PAGE_ATTRIBUTE_NAME, this.page.pageNumber.toString());

        this.httpService.get(TICKETS_URI, null, params).subscribe(
            results => this.handleOK(results),
            error => this.handleError(error)
        );
    }

    handleOK(response: any) {
        this.page.size = response.size;
        this.page.totalElements = response.totalElements;
        this.page.totalPages = response.totalPages;
        this.page.pageNumber = response.number;
        this.tickets = response.content;
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting tickets from server', httpError.error);
    }

    closeForm() {
        this.dialogRef.close();
    }

    changePage(page: Page) {
        this.page = page;
        this.ngOnInit();
    }

    editUser() {
        const dialogRef = this.editUserDialog.open(EditUserDialog, {data: {user: this.user}});
        dialogRef.afterClosed().subscribe(user => {
            if (!isUndefined(user))
                this.dialogRef.close(new User(user.mobile, user.password, user.dni, user.email, user.username,
                    user.address, user.active, user.id));
        });
    }
}