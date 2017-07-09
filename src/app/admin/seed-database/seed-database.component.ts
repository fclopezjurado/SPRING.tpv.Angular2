/**
 * Created by fran lopez on 16/05/2017.
 */

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TPVHTTPError} from '../../shared/models/tpv-http-error.model';
import {MdDialogRef} from '@angular/material';
import {ToastService} from '../../shared/services/toast.service';
import {HTTPService} from "../../shared/services/http.service";
import {ADMINS_URI, DATABASE_PATH} from '../admin.config';
import {RegExpFormValidatorService} from "../../shared/services/reg-exp-form-validator.service";
import {File, NAME_OF_REQUEST_PARAMETER_FOR_FILE_NAME} from "../shared/models/file.model";
import {URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";

@Component({
    templateUrl: './seed-database.component.html',
    styleUrls: ['./seed-database.component.css']
})
export class SeedDatabaseComponent implements OnInit {
    seedDatabaseForm: FormGroup;
    endpoint: string;
    file: File;
    validationMessages = {
        'file': {
            'required': 'File name is required.',
            'invalid': 'File name is invalid.'
        }
    };
    formErrors = {
        'file': ''
    };

    constructor(private dialogRef: MdDialogRef<SeedDatabaseComponent>, private formBuilder: FormBuilder,
                private toastService: ToastService, private httpService: HTTPService,
                private formValidatorByRegExp: RegExpFormValidatorService) {
        this.endpoint = ADMINS_URI + DATABASE_PATH;
        this.file = new File();
    }

    onSubmit(): void {
        const params = new URLSearchParams();
        const formValues = this.seedDatabaseForm.value;
        this.file.name = formValues.file;
        params.set(NAME_OF_REQUEST_PARAMETER_FOR_FILE_NAME, this.file.name);

        this.httpService.post(this.endpoint, null, null, params).subscribe(
            result => this.handleOK(),
            error => this.handleError(error)
        );
    }

    handleOK() {
        this.dialogRef.close();
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR in "seed database"', httpError.error);
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.seedDatabaseForm = this.formBuilder.group({
            'file': [this.file.name, [Validators.required, this.formValidatorByRegExp.regExpFormValidator(/\.yml$/)]]
        });
        this.seedDatabaseForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): boolean {
        if (!this.seedDatabaseForm) {
            return
        }

        const form = this.seedDatabaseForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];

                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                    this.toastService.info('ERROR in "' + field + '" field', messages[key]);
                }
            }
        }

        return false;
    }
}