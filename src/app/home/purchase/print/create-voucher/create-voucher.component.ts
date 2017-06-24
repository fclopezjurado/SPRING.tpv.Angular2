/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Voucher } from '../../../shared/models/voucher.model';
import { PrintService } from '../shared/services/print.service';
import { PDFService } from '../../shared/services/pdf.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
    selector: 'create-voucher-view',
    templateUrl: 'create-voucher.component.html'
})
export class CreateVoucherComponent {

    voucherValueInput: number;
    validity: number;

    constructor(public dialogRef: MdDialogRef<CreateVoucherComponent>, private printService: PrintService, private pdfService: PDFService, private toastService: ToastService) { }

    create(event: Event): void {
        event.preventDefault();
        this.printService.createVoucher(this.voucherValueInput, this.validity).then((pdf: Blob) => {
            this.toastService.success('Voucher created', `The voucher has been created`);
            this.pdfService.openBlob(pdf);
            this.dialogRef.close();
        }).catch((error: string) => {
            this.toastService.error('Error creating the voucher', error);
        });
        this.voucherValueInput = undefined;
        this.dialogRef.close();
    }

    formatVoucherValueInput(): void {
        if (this.voucherValueInput < 1) {
            this.voucherValueInput = undefined;
        }
    }

}
