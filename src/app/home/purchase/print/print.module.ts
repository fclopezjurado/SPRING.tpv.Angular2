/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PurchaseSharedModule } from '../shared/purchase-shared.module';

import { PrintComponent } from './print.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { PrintService } from './shared/services/print.service';

@NgModule({
    imports: [
        RouterModule,
        PurchaseSharedModule
    ],
    declarations: [PrintComponent, CreateVoucherComponent],
    providers: [PrintService],
    entryComponents: [CreateVoucherComponent]
})
export class PrintModule { }