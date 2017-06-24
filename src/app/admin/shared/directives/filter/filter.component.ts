/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {
    User,
    MOBILE_ATTRIBUTE_NAME,
    DNI_ATTRIBUTE_NAME,
    EMAIL_ATTRIBUTE_NAME
} from '../../../../shared/models/user.model';
import {RegExpFormValidatorService} from '../../../../shared/services/reg-exp-form-validator.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {TPVHTTPError} from "../../../../shared/models/tpv-http-error.model";
import {URLSearchParams} from '@angular/http';
import {isNull} from "util";
import {HTTPService} from "../../../../shared/services/http.service";

@Component({
    selector: 'filter',
    inputs: ['endpoint'],
    outputs: ['onUsersSearched'],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    user: User;
    endpoint: string;
    filterForm: FormGroup;
    validationMessages = {
        'mobile': {
            'minlength': 'Mobile must be 9 digits long.',
            'maxlength': 'Mobile must be 9 digits long.'
        },
        'dni': {
            'minlength': 'DNI must be 9 characters long.',
            'maxlength': 'DNI must be 9 characters long.',
            'invalid': 'DNI is invalid.'
        },
        'email': {
            'maxlength': 'Email cannot be more than 255 characters long.',
            'invalid': 'Email is invalid.'
        }
    };
    formErrors = {
        'mobile': '',
        'dni': '',
        'email': ''
    };
    onUsersSearched: EventEmitter<User[]>;

    constructor(private formBuilder: FormBuilder, private formValidatorByRegExp: RegExpFormValidatorService,
                private toastService: ToastService, private httpService: HTTPService) {
        this.clearUser();
        this.onUsersSearched = new EventEmitter();
    }

    clearUser() {
        this.user = new User();
    }

    onSubmit(): void {
        let formValues = this.filterForm.value;
        let params = new URLSearchParams();
        this.user = new User(parseInt(formValues.mobile), null, formValues.dni, formValues.email);
        let fieldName: string = null;
        let fieldValue = null;

        if (!isNull(this.user.mobile) && (this.user.mobile.valueOf() > 0)) {
            fieldName = MOBILE_ATTRIBUTE_NAME;
            fieldValue = this.user.mobile;
        }
        else if (!isNull(this.user.dni) && (this.user.dni.length > 0)) {
            fieldName = DNI_ATTRIBUTE_NAME;
            fieldValue = this.user.dni;
        }
        else if (!isNull(this.user.email) && (this.user.email.length > 0)) {
            fieldName = EMAIL_ATTRIBUTE_NAME;
            fieldValue = this.user.email;
        }

        params.set(fieldName, fieldValue);
        this.httpService.get(this.endpoint, null, params).subscribe(
            data => {
                this.clearForm();
                this.handleOK(data.data)
            },
            error => {
                this.clearForm();
                this.handleError(error)
            }
        );
    }

    clearForm() {
        this.clearUser();
        this.filterForm.reset();
    }

    handleOK(customers: User[]) {
        this.onUsersSearched.emit(customers);
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR in "filters"', httpError.error);
    }

    disableSubmit(): boolean {
        return (!(((this.filterForm.controls['mobile'].dirty)
        && (this.formErrors.mobile.length === 0))
        || ((this.filterForm.controls['dni'].dirty)
        && (this.formErrors.dni.length === 0))
        || ((this.filterForm.controls['email'].dirty)
        && (this.formErrors.email.length === 0))));
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.filterForm = this.formBuilder.group({
            'mobile': [this.user.mobile, [Validators.minLength(9), Validators.maxLength(9)]],
            'dni': [this.user.dni, [Validators.minLength(9), Validators.maxLength(9),
                this.formValidatorByRegExp.regExpFormValidator(/[0-9]{8}[A-Z]/)]],
            'email': [this.user.dni, [Validators.maxLength(255),
                this.formValidatorByRegExp.regExpFormValidator(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
        });
        this.filterForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): boolean {
        if (!this.filterForm)
            return;

        let form = this.filterForm;

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

    clearFilters() {
        this.clearForm();
        this.onSubmit();
    }
}