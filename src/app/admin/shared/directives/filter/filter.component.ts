/**
 * Created by fran lopez on 13/05/2017.
 */

import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../../shared/models/user.model';
import {RegExpFormValidatorService} from '../../../../shared/services/reg-exp-form-validator.service';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
    selector: 'filter',
    inputs: ['role'],
    outputs: ['onFilterUsers'],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    role: string;
    user: User;
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
    onFilterUsers: EventEmitter<User>;

    constructor(private formBuilder: FormBuilder, private formValidatorByRegExp: RegExpFormValidatorService,
                private toastService: ToastService) {
        this.clearUser();
        this.onFilterUsers = new EventEmitter();
    }

    clearUser() {
        this.user = new User();
    }

    onSubmit(): void {
        const formValues = this.filterForm.value;
        this.user = new User(parseInt(formValues.mobile, 10), null, formValues.dni, formValues.email);
        this.onFilterUsers.emit(this.user);
    }

    clearForm() {
        this.clearUser();
        this.filterForm.reset();
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

        const form = this.filterForm;

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
        this.onFilterUsers.emit(null);
    }
}