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
    CODE_ATTRIBUTE_NAME
} from '../../shared/models/shopping.model';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {ToastService} from "../../../shared/services/toast.service";
import {TPVHTTPError} from "../../../shared/models/tpv-http-error.model";
import {EditShoppingDialog} from '../edit-shopping/edit-shopping.component';
import {isNull, isUndefined} from "util";
import {HTTPService} from "../../../shared/services/http.service";
import {TICKETS_URI} from '../../admin.config';
import {TicketUpdate} from "../../shared/models/ticket-update.model";
import {ShoppingUpdate} from "../../shared/models/shopping-update.model";

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
        ];
    }

    getShoppings() {
        if (!isNull(this.ticket.shoppingList)) {
            this.shoppings = this.ticket.shoppingList;

            for (let index = 0; index < this.shoppings.length; index++) {
                if (isUndefined(this.shoppings[index].product)) {
                    this.shoppings[index].code = this.shoppings[index].productCode;
                    this.shoppings[index].price = this.shoppings[index].retailPrice * this.shoppings[index].amount;
                }
                else {
                    this.shoppings[index].code = this.shoppings[index].product.code;
                    this.shoppings[index].price = this.shoppings[index].product.retailPrice * this.shoppings[index].amount;
                }
            }
        }
    }

    ngOnInit(): void {
        if (!isUndefined(this.ticket.user) && !isNull(this.ticket.user)) {
            this.user = this.ticket.user;
        }

        this.getShoppings();
    }

    onActivate(selection: any) {
        this.selected = selection.row;
        const shopping = new Shopping(selection.row.id, selection.row.amount, selection.row.discount,
            selection.row.description, selection.row.price, selection.row.shoppingState, selection.row.code,
            selection.row.product);
        const dialogRef = this.editShoppingDialog.open(EditShoppingDialog, {data: {shopping: shopping}});
        dialogRef.afterClosed().subscribe(response => {
            this.editShopping(response);
        });
    }

    closeForm(): void {
        this.dialogRef.close();
    }

    editShopping(updatedShopping: Shopping) {
        if (!isUndefined(updatedShopping) && !updatedShopping.equals(this.selected)) {
            this.ticket.shoppingList = this.shoppings;
            let cash = 0;

            for (let index = 0; index < this.shoppings.length; index++) {
                if (updatedShopping.id === this.shoppings[index].id) {
                    this.shoppings[index].amount = updatedShopping.amount;
                    this.shoppings[index].price = updatedShopping.price;
                    cash = updatedShopping.price - this.shoppings[index].price;
                }
            }
            const updatedShoppings: ShoppingUpdate[] = [];
            updatedShoppings.push(new ShoppingUpdate(updatedShopping, updatedShopping.code));
            const requestBody = new TicketUpdate(cash, updatedShoppings, []);
            this.httpService.patch(TICKETS_URI + '/' + this.ticket.reference, requestBody).subscribe(
                results => console.log(results),
                error => this.handleError(error)
            );
        }
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting tickets from server', httpError.error);
    }
}