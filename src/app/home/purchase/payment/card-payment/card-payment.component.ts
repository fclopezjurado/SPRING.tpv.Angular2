/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ShoppingService } from '../../../shared/services/shopping.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
    selector: 'card-payment-view',
    templateUrl: './card-payment.component.html'
})
export class CardPaymentComponent {

    amount: number;

    constructor(private shoppingService: ShoppingService, private toastService: ToastService, public dialogRef: MdDialogRef<CardPaymentComponent>) { }

    setAmountPaidWithCard(event: any): void {
        event.preventDefault();
        this.shoppingService.setAmountPaidWithCard(this.amount);
        this.dialogRef.close();
    }

    formatInput(): void {
        if (this.amount < 0) {
            this.amount = 0;
        }
    }

}