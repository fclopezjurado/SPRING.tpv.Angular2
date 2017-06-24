/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { Subscription } from 'rxjs/Subscription';

import { CartProduct } from '../../shared/models/cart-product.model';
import { PrintService } from './shared/services/print.service';
import { PDFService } from '../shared/services/pdf.service';
import { ShoppingService } from '../../shared/services/shopping.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
    selector: 'print-view',
    templateUrl: 'print.component.html',
    styles: [`
        @media only screen and (min-width: 960px) {
            md-card {
                width: 20em;
            }
        }
    `]
})
export class PrintComponent implements OnInit, OnDestroy {

    userMobile: number = this.shoppingService.getUserMobile();
    userAssociatedSubscription: Subscription;
    shoppingCartSubscription: Subscription;
    printInvoiceSelected: boolean = false;
    printed: boolean = false;

    constructor(public shoppingService: ShoppingService, public printService: PrintService, private pdfService: PDFService, public router: Router, public dialog: MdDialog, private toastService: ToastService) { }

    ngOnInit() {
        this.userAssociatedSubscription = this.shoppingService.getUserMobileObservable().subscribe((userMobile: number) => {
            this.userMobile = userMobile;
        });
        this.shoppingCartSubscription = this.shoppingService.getCartProductsObservable().subscribe((cartProducts: CartProduct[]) => {
            this.router.navigate(['/home']);
        });
        !this.shoppingService.getTicketReference() && this.router.navigate(['/home/purchase/payment']);
    }

    createVoucher(): void {
        this.dialog.open(CreateVoucherComponent);
    }

    printInvoice(): void {
        if (this.userMobile) {
            this.printService.createInvoice(this.shoppingService.getTicketReference()).then((pdf: Blob) => {
                this.printInvoiceSelected = false;
                this.pdfService.openBlob(pdf);
                this.printed = true;
            }).catch((error: string) => {
                this.toastService.error('Error generating invoice', error);
            });
        } else {
            this.printInvoiceSelected = true;
        }
    }

    finish(): void {
        this.shoppingService.finishPayment();
    }

    cancel(): void {
        this.printInvoiceSelected = false;
    }

    ngOnDestroy() {
        this.userAssociatedSubscription && this.userAssociatedSubscription.unsubscribe();
        this.shoppingCartSubscription && this.shoppingCartSubscription.unsubscribe();
    }

}
