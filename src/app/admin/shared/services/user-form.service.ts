/**
 * Created by fran lopez on 03/06/2017.
 */

import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user.model';
import {RegExpFormValidatorService} from '../../../shared/services/reg-exp-form-validator.service';
import {ToastService} from '../../../shared/services/toast.service';
import {isUndefined} from "util";

@Injectable()
export class UserForm {
    user: User;
    userForm: FormGroup;
    formErrors = {
        'mobile': '',
        'email': '',
        'username': '',
        'password': '',
        'address': '',
        'dni': ''
    };
    validationMessages = {
        'mobile': {
            'minlength': 'Mobile must be 9 digits long.',
            'maxlength': 'Mobile must be 9 digits long.',
            'required': 'Mobile is required.'
        },
        'email': {
            'maxlength': 'Email cannot be more than 255 characters long.',
            'required': 'Email is required.',
            'invalid': 'Email is invalid.'
        },
        'username': {
            'maxlength': 'Username cannot be more than 255 characters long.'
        },
        'password': {
            'maxlength': 'Password cannot be more than 255 characters long.',
            'required': 'Password is required.'
        },
        'address': {
            'maxlength': 'Password cannot be more than 255 characters long.'
        },
        'dni': {
            'minlength': 'DNI must be 9 characters long.',
            'maxlength': 'DNI must be 9 characters long.',
            'invalid': 'DNI is invalid.'
        }
    };

    constructor(private formBuilder: FormBuilder,
                private formValidatorByRegExp: RegExpFormValidatorService, private toastService: ToastService) {
    }

    setUser(user: User) {
        this.user = user;
    }

    getFormGroup(): FormGroup {
        return this.userForm;
    }

    buildForm(): void {
        if (!isUndefined(this.user)) {
            this.userForm = this.formBuilder.group({
                'mobile': [this.user.mobile, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
                'email': [this.user.email, [Validators.required, Validators.maxLength(255),
                    this.formValidatorByRegExp.regExpFormValidator(
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
                'username': [this.user.username, [Validators.maxLength(255)]],
                'password': [this.user.password, [Validators.required, Validators.maxLength(255)]],
                'address': [this.user.address, [Validators.maxLength(255)]],
                'dni': [this.user.dni, [Validators.minLength(9), Validators.maxLength(9),
                    this.formValidatorByRegExp.regExpFormValidator(/[0-9]{8}[A-Z]/)]],
                'active': [this.user.active, []],
            });
            this.userForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
            this.onValueChanged();
        }

    }

    onValueChanged(data?: any): boolean {
        if (!this.userForm)
            return;

        let form = this.userForm;

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