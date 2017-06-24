/**
 * Created by fran lopez on 06/06/2017.
 */

import {Component, OnInit} from '@angular/core';
import {TPVHTTPError} from '../../shared/models/tpv-http-error.model';
import {ToastService} from '../../shared/services/toast.service';
import {Ticket} from '../shared/models/ticket.model';
import {TICKETS, TICKETS_URI} from '../admin.config';
import {HTTPService} from "../../shared/services/http.service";

@Component({
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    results = [];
    dataType: string;
    selected: Ticket;

    constructor(public httpService: HTTPService, public toastService: ToastService) {
        this.selected = new Ticket();
        this.dataType = TICKETS
    }

    ngOnInit(): void {
        this.httpService.get(TICKETS_URI).subscribe(
            results => this.results = results.data,
            error => this.handleError(error)
        );
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting results from server', httpError.error);
    }

    loadResultsFound(results: Ticket[]) {
        this.results = results;
    }
}