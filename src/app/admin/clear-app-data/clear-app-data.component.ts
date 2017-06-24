/**
 * Created by fran lopez on 16/05/2017.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {TPVHTTPError} from '../../shared/models/tpv-http-error.model';
import {MdDialogRef} from '@angular/material';
import {ToastService} from '../../shared/services/toast.service';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {LOCAL_STORAGE_TOKEN_ATTRIBUTE} from '../../app.config';
import {HTTPService} from "../../shared/services/http.service";
import {API_GENERIC_URI} from '../../app.config';

@Component({
    templateUrl: './clear-app-data.component.html',
    styleUrls: ['./clear-app-data.component.css']
})
export class ClearAppDataDialog implements OnInit {
    clearAppDataForm: FormGroup;
    endpoint: string;

    constructor(private dialogRef: MdDialogRef<ClearAppDataDialog>, private formBuilder: FormBuilder,
                private toastService: ToastService, private httpService: HTTPService,
                private router: Router, private localStorageService: LocalStorageService) {
        this.endpoint = API_GENERIC_URI + '/admins';
    }

    onSubmit(): void {
        this.httpService.delete(this.endpoint).subscribe(
            result => this.handleOK(),
            error => this.handleError(error)
        );
    }

    handleOK() {
        this.closeForm();
        this.logout();
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR in "clear app data"', httpError.error);
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.clearAppDataForm = this.formBuilder.group({});
    }

    closeForm(): void {
        this.dialogRef.close();
    }

    logout() {
        this.router.navigate(['/welcome']);
        this.localStorageService.removeItem(LOCAL_STORAGE_TOKEN_ATTRIBUTE);
        this.toastService.info('Goodbye', 'You have logged out');
    }
}