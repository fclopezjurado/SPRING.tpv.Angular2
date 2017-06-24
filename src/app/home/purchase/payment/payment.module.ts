/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';

import { PurchaseSharedModule } from '../shared/purchase-shared.module';

import { PaymentComponent } from './payment.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { VoucherPaymentComponent } from './voucher-payment/voucher-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
    imports: [PurchaseSharedModule],
    declarations: [PaymentComponent, CashPaymentComponent, VoucherPaymentComponent, CardPaymentComponent, ChangeComponent],
    entryComponents: [CashPaymentComponent, VoucherPaymentComponent, CardPaymentComponent]
})
export class PaymentModule { }