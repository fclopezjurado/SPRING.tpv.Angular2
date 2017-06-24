/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentModule } from './payment/payment.module';
import { PrintModule } from './print/print.module';
import { PurchaseSharedModule } from './shared/purchase-shared.module';

import { PurchaseComponent } from './purchase.component';
import { PDFService } from './shared/services/pdf.service';

@NgModule({
    imports: [
        RouterModule,
        PaymentModule,
        PrintModule,
        PurchaseSharedModule
    ],
    declarations: [PurchaseComponent],
    providers: [PDFService]
})
export class PurchaseModule { }