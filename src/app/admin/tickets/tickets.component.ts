/**
 * Created by fran lopez on 06/06/2017.
 */

import {Component, OnInit} from '@angular/core';
import {TPVHTTPError} from '../../shared/models/tpv-http-error.model';
import {ToastService} from '../../shared/services/toast.service';
import {Ticket} from '../shared/models/ticket.model';
import {TICKETS, TICKETS_URI, ALL_PATH} from '../admin.config';
import {HTTPService} from "../../shared/services/http.service";
import {isArray, isNull, isUndefined} from "util";
import {Utils} from "../shared/models/utils.service";

@Component({
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    results: Ticket[] = [];
    dataType: string;
    selected: Ticket;

    constructor(public httpService: HTTPService, public toastService: ToastService) {
        this.selected = new Ticket();
        this.dataType = TICKETS
    }

    ngOnInit(): void {
        this.httpService.get(TICKETS_URI + ALL_PATH).subscribe(
            results => this.loadResultsFound(results, true),
            error => this.handleError(error)
        );
    }

    /**
     * TODO: Delete "init" parameter when all endpoints for tickets used in this module, returns the same date format.
     * TODO: Delete main "if loop" when all endpoints for tickets used in this module, returns the same data structure.
     * @param results
     * @param init
     */
    loadResultsFound(results: any, init?: boolean) {
        if (isArray(results)) {
            for (let index = 0; index < results.length; index++) {
                if (isUndefined(results[index].user) || isUndefined(results[index].shoppingList)) {
                    const ticket = this.findByReference(results[index].reference);

                    if (isUndefined(results[index].user) && !isNull(ticket.user) && ticket) {
                        results[index].user = ticket.user;
                        results[index].mobile = ticket.user.mobile;
                    }
                    if (isUndefined(results[index].shoppingList) && !isNull(ticket.shoppingList) && ticket) {
                        results[index].shoppingList = ticket.shoppingList;
                    }
                } else if (!isUndefined(results[index].user) && !isNull(results[index].user)
                    && !isUndefined(results[index].user.id)) {
                    results[index].mobile = results[index].user.mobile;
                }

                if (init) {
                    results[index].created = Utils.formatDate(results[index].created);
                }
            }
        }

        this.results = results;
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting results from server', httpError.error);
    }

    /**
     * TODO: Delete this function when all endpoints for tickets used in this module, returns the same data structure.
     * @param reference
     * @returns {any}
     */
    findByReference(reference: string) {
        for (const ticket of this.results) {
            if (ticket.reference === reference) {
                return ticket;
            }
        }

        return new Ticket();
    }
}