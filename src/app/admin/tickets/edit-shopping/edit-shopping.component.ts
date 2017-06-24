/**
 * Created by fran lopez on 13/06/2017.
 */

import {Component, Inject, OnInit} from '@angular/core';
import {Shopping} from '../../shared/models/shopping.model';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {isNumeric} from "rxjs/util/isNumeric";
import {ToastService} from "../../../shared/services/toast.service";
import {TPVHTTPError} from "../../../shared/models/tpv-http-error.model";
import {ShoppingState} from "../../shared/models/shopping-state.model";
import {FormControl} from "@angular/forms";
import {HTTPService} from "../../../shared/services/http.service";
import {SHOPPING_STATES_URI} from '../../admin.config';

@Component({
    templateUrl: './edit-shopping.component.html',
    styleUrls: ['./edit-shopping.component.css']
})
export class EditShoppingDialog implements OnInit {
    shopping: Shopping;
    shoppingStates: string[] = [];
    stateCtrl: FormControl;
    filteredStates: any;

    constructor(@Inject(MD_DIALOG_DATA) private data: { shopping: Shopping },
                public dialogRef: MdDialogRef<EditShoppingDialog>,
                private httpService: HTTPService, private toastService: ToastService) {
        this.shopping = this.data.shopping;
        this.stateCtrl = new FormControl();
    }

    ngOnInit() {
        this.httpService.get(SHOPPING_STATES_URI).subscribe(
            results => this.setShoppingStates(results.data),
            error => this.handleError(error)
        );
        this.filteredStates = this.stateCtrl.valueChanges
            .map(name => this.filterStates(name));
    }

    setShoppingStates(shoppingStates: ShoppingState[]) {
        for (let shoppingState of shoppingStates)
            this.shoppingStates.push(shoppingState.state);
    }

    filterStates(state: string) {
        return state ? this.shoppingStates.filter(s => new RegExp(`^${state}`, 'gi').test(s))
            : this.shoppingStates;
    }

    handleError(httpError: TPVHTTPError) {
        this.toastService.info('ERROR getting tickets from server', httpError.error);
    }

    updatePrice(amount: number) {
        if (isNumeric(amount)) {
            this.shopping.price = ((this.shopping.price + (this.shopping.price * (this.shopping.discount / 100)))
                / this.shopping.amount) * amount;
            this.shopping.price -= this.shopping.price * this.shopping.discount / 100;
            this.shopping.price = Math.round(this.shopping.price * 10) / 10;
            this.shopping.amount = amount;
        }
    }

    onSubmit(): void {
        if (!this.shoppingStates.includes(this.shopping.state))
            this.toastService.info('ERROR. invalid state for shopping line', this.shopping.state);
        else
            this.dialogRef.close(this.shopping);
    }
}