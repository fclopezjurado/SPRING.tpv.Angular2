/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Voucher } from '../../../shared/models/voucher.model';
import { ShoppingService } from '../../../shared/services/shopping.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
    selector: 'voucher-payment-view',
    templateUrl: './voucher-payment.component.html'
})
export class VoucherPaymentComponent {

    referenceInput: string;

    constructor(private shoppingService: ShoppingService, private toastService: ToastService, public dialogRef: MdDialogRef<VoucherPaymentComponent>) { }

    addVoucher(event: any): void {
        event.preventDefault();
        this.shoppingService.addVoucher(this.referenceInput).then((voucher: Voucher) => {
            this.toastService.success('Voucher added', 'The voucher has been added to the purchase');
            this.referenceInput = undefined;
        }).catch((error: string) => {
            this.referenceInput = undefined;
            this.toastService.error('Error adding the voucher', error);
        });
        this.dialogRef.close();
    }

}