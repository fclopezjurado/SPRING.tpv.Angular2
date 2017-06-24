/**
 * Created by fran lopez on 02/05/2017.
 */

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Ticket} from './ticket.model';

@Component({
    selector: 'ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['../shared.css']
})
export class TicketComponent implements OnInit {
    ticket: Ticket;
    ticketForm: FormGroup;
    formErrors = {
        'reference': ''
    };
    validationMessages = {
        'reference': {
            'required': 'Reference is required.',
            'maxlength': 'Reference can be 255 digits long.'
        }
    };

    constructor(private formBuilder: FormBuilder) {
        this.ticket = new Ticket('');
    }

    onSubmit(): void {
        this.ticket = this.ticketForm.value;
        console.log(this.ticket);
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.ticketForm = this.formBuilder.group({
            'reference': [this.ticket.reference,
                [Validators.required, Validators.maxLength(255)]
            ]
        });
        this.ticketForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): boolean {
        if (!this.ticketForm)
            return;

        const form = this.ticketForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];

                for (const key in control.errors)
                    this.formErrors[field] += messages[key] + ' ';
            }
        }

        return false;
    }
}