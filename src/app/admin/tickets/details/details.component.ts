/**
 * Created by fran lopez on 30/05/2017.
 */

import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from '@angular/material';
import {Ticket} from '../../shared/models/ticket.model';
import {
    Shopping,
    AMOUNT_ATTRIBUTE_NAME,
    DISCOUNT_ATTRIBUTE_NAME,
    DESCRIPTION_ATTRIBUTE_NAME,
    PRICE_ATTRIBUTE_NAME,
    STATE_ATTRIBUTE_NAME,
    CODE_ATTRIBUTE_NAME,
    TICKET_ATTRIBUTE_NAME
} from '../../shared/models/shopping.model';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {ToastService} from "../../../shared/services/toast.service";
import {USERS_URI} from '../../admin.config';
import {ID_ATTRIBUTE_NAME} from '../../../shared/models/user.model';
import {TPVHTTPError} from "../../../shared/models/tpv-http-error.model";
import {EditShoppingDialog} from '../edit-shopping/edit-shopping.component';
import {isUndefined} from "util";
import {HTTPService} from "../../../shared/services/http.service";
import {URLSearchParams} from "@angular/http";
import {SHOPPINGS_URI} from '../../admin.config';

@Component({
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class TicketDetailsDialog implements OnInit {
    user: User;
    ticket: Ticket;
    shoppings: Shopping[];
    headers: Object;
    capitalizePipe: CapitalizePipe;
    selected: Shopping;

    constructor(@Inject(MD_DIALOG_DATA) private data: { ticket: Ticket },
                public dialogRef: MdDialogRef<TicketDetailsDialog>, private httpService: HTTPService,
                private toastService: ToastService, private editShoppingDialog: MdDialog) {
        this.user = new User();
        this.ticket = this.data.ticket;
        this.capitalizePipe = new CapitalizePipe();
        this.headers = [{name: this.capitalizePipe.transform(CODE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(AMOUNT_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(DISCOUNT_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(PRICE_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(DESCRIPTION_ATTRIBUTE_NAME, false)},
            {name: this.capitalizePipe.transform(STATE_ATTRIBUTE_NAME, false)}
        ]
    }

    getShoppings() {
        let params = new URLSearchParams();

        params.set(TICKET_ATTRIBUTE_NAME, this.ticket.id.toString());
        this.httpService.get(SHOPPINGS_URI, null, params).subscribe(
            results => this.shoppings = results.data,
            error => this.handleError(error)
        );
    }

    ngOnInit(): void {
        let params = new URLSearchParams();
        params.set(ID_ATTRIBUTE_NAME, this.ticket.user.toString());

        this.httpService.get(USERS_URI, null, params).subscribe(
            results => this.user = results.data[0],
            error => this.handleError(error)
        );

        this.getShoppings();
    }

    onActivate(selection: any) {
        this.selected = selection.row;
        let shopping = new Shopping(selection.row.id, selection.row.amount, selection.row.discount,
            selection.row.description, selection.row.price, selection.row.state, selection.row.code,
            selection.row.ticket);
        let dialogRef = this.editShoppingDialog.open(EditShoppingDialog, {data: {shopping: shopping}});

        dialogRef.afterClosed().subscribe(shopping => {
            this.editShopping(shopping);
        });
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting tickets from server', httpError.error);
    }

    closeForm(): void {
        this.dialogRef.close();
    }

    editShopping(shopping: Shopping) {
        if (!isUndefined(shopping) && !shopping.equals(this.selected)) {
            this.httpService.put(SHOPPINGS_URI + '/' + shopping.id, shopping).subscribe(
                results => this.getShoppings(),
                error => this.handleError(error)
            );
        }
    }
}