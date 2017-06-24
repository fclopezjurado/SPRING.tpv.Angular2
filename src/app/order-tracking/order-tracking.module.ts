/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';

import { OrderTrackingComponent } from './order-tracking.component';
import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingService } from './order-tracking.service';

@NgModule({
    declarations: [OrderTrackingComponent],
    imports: [
        NgxDatatableModule,
        OrderTrackingRoutingModule,
        SharedModule
    ],
    providers: [OrderTrackingService]
})
export class OrderTrackingModule { }