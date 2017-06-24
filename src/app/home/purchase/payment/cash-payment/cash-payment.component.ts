/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ShoppingService } from '../../../shared/services/shopping.service';

@Component({
    selector: 'cash-payment-view',
    templateUrl: './cash-payment.component.html',
    styles: [`
        .money-container {
            margin-bottom: 1em;
            position: relative;
        }
        
        .money-container > img {
            cursor: pointer;
            width: 100%;
        }

        .money-container > button {
            position: absolute;
            right: 0px;
        }
    `]
})

export class CashPaymentComponent {

    totalPrice: number = this.shoppingService.getCashToPay();
    moneyQuantitiesCharged: Object = {
        "500": 0,
        "200": 0,
        "100": 0,
        "50": 0,
        "20": 0,
        "10": 0,
        "5": 0,
        "2": 0,
        "1": 0,
        "0.5": 0,
        "0.2": 0,
        "0.1": 0,
        "0.05": 0,
        "0.02": 0,
        "0.01": 0
    };
    moneyCharged: number;

    constructor(public dialogRef: MdDialogRef<CashPaymentComponent>, private shoppingService: ShoppingService) { }

    addQuantity(quantity: number): void {
        if (this.moneyCharged == undefined) {
            this.moneyCharged = 0.0;
        }
        this.moneyQuantitiesCharged[quantity.toString()]++;
        let total: number = this.moneyCharged + quantity;
        this.updateMoneyCharged(total);
    }

    removeQuantity(quantity: number): void {
        this.moneyQuantitiesCharged[quantity.toString()]--;
        let total: number = this.moneyCharged - quantity;
        this.updateMoneyCharged(total);
    }

    private updateMoneyCharged(total: number): void {
        this.moneyCharged = Math.round(total * 100) / 100;
    }

    finishPayment(): void {
        this.dialogRef.close();
        if (!this.moneyCharged) {
            this.moneyCharged = 0;
        }
        this.shoppingService.setCashReceived(this.moneyCharged);
    }

    formatCountedMoneyInput(): void {
        if (this.moneyCharged < 0) {
            this.moneyCharged = 0;
        }
    }

}