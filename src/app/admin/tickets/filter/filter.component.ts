/**
 * Created by fran lopez on 07/06/2017.
 */

import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Ticket} from '../../shared/models/ticket.model';
import {MOBILE_ATTRIBUTE_NAME} from '../../../shared/models/user.model';
import {Filter, START_DATE_ATTRIBUTE_NAME, END_DATE_ATTRIBUTE_NAME} from './filter.model';
import {ToastService} from '../../../shared/services/toast.service';
import {RegExpFormValidatorService} from '../../../shared/services/reg-exp-form-validator.service';
import {TPVHTTPError} from "../../../shared/models/tpv-http-error.model";
import {isNull, isUndefined} from "util";
import {HTTPService} from "../../../shared/services/http.service";
import {URLSearchParams} from "@angular/http";
import {TICKETS_URI, ALL_PATH} from '../../admin.config';
import {Utils} from "../../shared/models/utils.service";

@Component({
    selector: 'filter',
    inputs: ['httpService'],
    outputs: ['onTicketsSearched'],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    filter: Filter;
    httpService: HTTPService;
    filterForm: FormGroup;
    validationMessages = {
        'mobile': {
            'minlength': 'user must be 9 digits long.',
            'maxlength': 'user must be 9 digits long.',
            'invalid': 'user is invalid.'
        },
        'reference': {
            'maxlength': 'Reference cannot be more than 255 characters long.'
        },
        'start_date': {
            'invalid': 'Start date is invalid.'
        },
        'end_date': {
            'invalid': 'Start date is invalid.'
        }
    };
    formErrors = {
        'mobile': '',
        'reference': '',
        'start_date': '',
        'end_date': ''
    };
    onTicketsSearched: EventEmitter<Ticket[]>;

    constructor(private formBuilder: FormBuilder, private formValidatorByRegExp: RegExpFormValidatorService,
                private toastService: ToastService) {
        this.setFilter();
        this.onTicketsSearched = new EventEmitter();
    }

    setFilter() {
        this.filter = new Filter();
    }

    onSubmit(): void {
        const formValues = this.filterForm.value;
        const params = new URLSearchParams();
        this.filter = new Filter(formValues.mobile, formValues.reference, formValues.start_date, formValues.end_date);
        let fieldName: string = null;
        let fieldValue = null;
        let endpoint = TICKETS_URI;

        if (!isNull(this.filter.mobile) && (this.filter.mobile > 0)) {
            fieldName = MOBILE_ATTRIBUTE_NAME;
            fieldValue = this.filter.mobile;
        }
        else if (!isNull(this.filter.reference) && (this.filter.reference.length > 0)) {
            endpoint += '/' + this.filter.reference;
        }
        else if (!isNull(this.filter.start_date) && (this.filter.start_date.length > 0)) {
            fieldName = START_DATE_ATTRIBUTE_NAME;
            const date = new Date(this.filter.start_date);
            fieldValue = date.getTime();
        }
        else if (!isNull(this.filter.end_date) && (this.filter.end_date.length > 0)) {
            fieldName = END_DATE_ATTRIBUTE_NAME;
            const date = new Date(this.filter.end_date);
            fieldValue = date.getTime();
        }
        else {
            endpoint += ALL_PATH;
        }

        params.set(fieldName, fieldValue);
        this.httpService.get(endpoint, null, params).subscribe(
            response => {
                this.handleOK(response);
                this.clearForm();
            },
            error => {
                this.clearForm();
                this.handleError(error)
            }
        );
    }

    clearForm() {
        this.setFilter();
        this.filterForm.reset();
    }

    handleOK(response: any) {
        let tickets = [];

        if (!isUndefined(response.content)) {
            tickets = this.loadResultsByMobile(response.content);
        }
        else if (!isNull(this.filter.reference) && (this.filter.reference.length > 0)) {
            tickets = this.loadResultsByReference(response);
        }
        else {
            tickets = this.loadResults(response);
        }

        this.onTicketsSearched.emit(tickets);
    }

    loadResults(tickets): any {
        for (let index = 0; index < tickets.length; index++) {
            tickets[index].created = Utils.formatDate(tickets[index].created);
        }

        return tickets;
    }

    loadResultsByMobile(tickets): any {
        if (!isNull(this.filter.mobile) && (this.filter.mobile > 0)) {
            for (let index = 0; index < tickets.length; index++) {
                tickets[index].created = Utils.formatDate(tickets[index].created);
            }
        }

        return tickets;
    }

    loadResultsByReference(ticket): any {
        const tickets = [];
        ticket.created = Utils.formatDateFromYYYYMMDD(ticket.created);
        tickets.push(ticket);
        return tickets;
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR in "filters"', httpError.error);
    }

    disableSubmit(): boolean {
        return (!(((this.filterForm.controls['mobile'].dirty)
            && (this.formErrors.mobile.length === 0))
            || ((this.filterForm.controls['reference'].dirty)
            && (this.formErrors.reference.length === 0))
            || ((this.filterForm.controls['start_date'].dirty)
            && (this.formErrors.start_date.length === 0))
            || ((this.filterForm.controls['end_date'].dirty)
            && (this.formErrors.end_date.length === 0))
        ));
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.filterForm = this.formBuilder.group({
            'mobile': [this.filter.mobile, [Validators.minLength(9), Validators.maxLength(9),
                this.formValidatorByRegExp.regExpFormValidator(/[0-9]{9}/)]],
            'reference': [this.filter.reference, [Validators.maxLength(255)]],
            'start_date': [this.filter.start_date, [
                this.formValidatorByRegExp.regExpFormValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)]],
            'end_date': [this.filter.end_date, [
                this.formValidatorByRegExp.regExpFormValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)]],
        });
        this.filterForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): boolean {
        if (!this.filterForm) {
            return
        }

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
        this.onSubmit();
    }
}