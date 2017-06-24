/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';

import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { VoucherPaymentComponent } from './voucher-payment/voucher-payment.component';

import { CartProduct } from '../../shared/models/cart-product.model';
import { Voucher } from '../../shared/models/voucher.model';
import { NewTicketResponse } from '../../shared/models/new-ticket-response.model';
import { PDFService } from '../shared/services/pdf.service';
import { ShoppingService } from '../../shared/services/shopping.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
    selector: 'payment-view',
    templateUrl: './payment.component.html',
    styles: [`
	    @media only screen and (min-width: 960px) {
	        #money-received-container {
	            width: 20em;
	        }
	    }
  `]
})
export class PaymentComponent implements OnInit, OnDestroy {

    totalPrice: number = this.shoppingService.getTotalPrice();
    paidOut: boolean = false;
    shoppingCartSubscription: Subscription;
    cashReceivedSubscription: Subscription;
    amountPaidWithCardSubscription: Subscription;
    vouchersSubscription: Subscription;
    submittedSubscription: Subscription;
    vouchers: Voucher[] = [];
    submitted: boolean = this.shoppingService.isSubmitted();

    constructor(private shoppingService: ShoppingService, private pdfService: PDFService, private toastService: ToastService,
        public dialog: MdDialog, private router: Router) { }

    ngOnInit() {
        this.shoppingCartSubscription = this.shoppingService.getCartProductsObservable().subscribe((cartProducts: CartProduct[]) => {
            this.paidOut = false;
            this.shoppingService.resetPayment();
            this.totalPrice = this.shoppingService.getTotalPrice();
        });
        this.cashReceivedSubscription = this.shoppingService.getCashReceivedObservable().subscribe((cashReceived: number) => {
            this.paidOut = this.shoppingService.isPaidOut();
        });
        this.amountPaidWithCardSubscription = this.shoppingService.getAmountPaidWithCardObservable().subscribe((amountPaidWithCard: number) => {
            this.paidOut = this.shoppingService.isPaidOut();
        });
        this.vouchersSubscription = this.shoppingService.getVouchersObservable().subscribe((vouchers: Voucher[]) => {
            this.vouchers = vouchers;
            this.paidOut = this.shoppingService.isPaidOut();
        });
        this.submittedSubscription = this.shoppingService.getSubmittedObservable().subscribe((submitted: boolean) => {
            this.submitted = submitted;
            this.router.navigate(['/home/purchase/print']);
        });
        this.isShoppingCartEmpty() && this.router.navigate(['/home']);
        this.submitted && this.shoppingService.isShoppingCartEmpty() && this.router.navigate(['/home/purchase/print']);
    }

    isShoppingCartEmpty(): boolean {
        return this.shoppingService.isShoppingCartEmpty();
    }

    submitOrder(): void {
        this.shoppingService.submitOrder().then((ticketCreated: NewTicketResponse) => {
            this.toastService.success('Checkout done', 'The ticket has been created');
            this.pdfService.openBase64(ticketCreated.pdfByteArray);
        }).catch((error: string) => {
            this.toastService.error('Error in checkout', error);
        });
    }

    openCashPaymentDialog(): void {
        let dialogRef: MdDialogRef<CashPaymentComponent> = this.dialog.open(CashPaymentComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.paidOut = this.shoppingService.isPaidOut();
        });
    }

    openAddVoucherDialog(): void {
        this.dialog.open(VoucherPaymentComponent);
    }

    openCardPaymentDialog(): void {
        let dialogRef: MdDialogRef<CardPaymentComponent> = this.dialog.open(CardPaymentComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.paidOut = this.shoppingService.isPaidOut();
        });
    }

    cancel(): void {
        this.shoppingService.clear();
        this.router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.shoppingCartSubscription && this.shoppingCartSubscription.unsubscribe();
        this.cashReceivedSubscription && this.cashReceivedSubscription.unsubscribe();
        this.amountPaidWithCardSubscription && this.amountPaidWithCardSubscription.unsubscribe();
        this.vouchersSubscription && this.vouchersSubscription.unsubscribe();
        this.submittedSubscription && this.submittedSubscription.unsubscribe();
    }

}