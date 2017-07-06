/**
 * Created by fran lopez on 16/05/2017.
 */

import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../../../shared/models/user.model';
import {TPVHTTPError} from '../../../../shared/models/tpv-http-error.model';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {ToastService} from '../../../../shared/services/toast.service';
import {UserForm} from '../../services/user-form.service';
import {HTTPService} from '../../../../shared/services/http.service';
import {ROLE_ATTRIBUTE_NAME} from '../../../../shared/models/session.model';
import {URLSearchParams} from "@angular/http";

@Component({
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})
export class NewUserDialog implements OnInit {
    user: User;
    userForm: FormGroup;
    endpoint: string;
    role: string;

    constructor(@Inject(MD_DIALOG_DATA) private data: { endpoint: string, role: string },
                public dialogRef: MdDialogRef<NewUserDialog>, private toastService: ToastService,
                private httpService: HTTPService, private userFormService: UserForm) {
        this.user = new User();
        this.endpoint = this.data.endpoint;
        this.role = this.data.role;
        this.userFormService.setUser(this.user);
    }

    onSubmit(): void {
        const params = new URLSearchParams();
        this.user = this.userFormService.getFormGroup().value;

        params.set(ROLE_ATTRIBUTE_NAME, this.role);
        this.httpService.post(this.endpoint, this.user, null, params).subscribe(
            result => this.dialogRef.close(this.user),
            error => this.handleError(error)
        );
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR in "creation"', httpError.error);
    }

    ngOnInit(): void {
        this.userFormService.buildForm();
        this.userForm = this.userFormService.getFormGroup();
    }
}