/**
 * Created by fran lopez on 15/05/2017.
 */

import {Component, EventEmitter} from '@angular/core';
import {
    Ticket,
    REFERENCE_ATTRIBUTE_NAME,
    CREATED_DATE_ATTRIBUTE_NAME,
    USER_ID_ATTRIBUTE_NAME
} from '../../shared/models/ticket.model';
import {MdDialog} from '@angular/material';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {TicketDetailsDialog} from '../details/details.component';

@Component({
    selector: 'results',
    inputs: ['results'],
    outputs: ['onSelect', 'onModify'],
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent {
    results: Ticket[];
    headers: Object;
    onSelect: EventEmitter<Ticket>;
    onModify: EventEmitter<Ticket>;
    capitalizePipe: CapitalizePipe;

    constructor(private userDetailsDialog: MdDialog) {
        this.onSelect = new EventEmitter();
        this.onModify = new EventEmitter();
        this.capitalizePipe = new CapitalizePipe();
        this.headers = [{name: this.capitalizePipe.transform(REFERENCE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(CREATED_DATE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(USER_ID_ATTRIBUTE_NAME, false)}
        ]
    }

    onActivate(selection: any) {
        this.onSelect.emit(selection.row);

        let dialogRef = this.userDetailsDialog.open(TicketDetailsDialog, {data: {ticket: selection.row}});
        dialogRef.afterClosed().subscribe(user => {
            console.log(user);
        });
    }
}