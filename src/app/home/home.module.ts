/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeGuard } from './home.guard';

import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SearchModule } from './search/search.module';
import { OpenCashierModule } from './open-cashier/open-cashier.module';
import { CloseCashierModule } from './close-cashier/close-cashier.module';
import { MovementModule } from './movement/movement.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TicketsOfTheDayModule } from './tickets-of-the-day/tickets-of-the-day.module';
import { HomeSharedModule } from './shared/home-shared.module';

import { HomeComponent, OrderTrackingDialogComponent } from './home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeService } from './home.service';
import { AuthService } from './shared/services/auth.service';

import { HTTPService } from '../shared/services/http.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ToastService } from '../shared/services/toast.service';
import { ShoppingService } from './shared/services/shopping.service';
import { CashierService } from './shared/services/cashier.service';

@NgModule({
    imports: [
        HomeRoutingModule,
        ShoppingCartModule,
        SearchModule,
        OpenCashierModule,
        CloseCashierModule,
        MovementModule,
        PurchaseModule,
        TicketsOfTheDayModule,
        HomeSharedModule
    ],
    declarations: [
        HomeComponent,
        ShoppingCartComponent,
        OrderTrackingDialogComponent
    ],
    providers: [
        HomeGuard,
        HomeService,
        HTTPService,
        LocalStorageService,
        ToastService,
        ShoppingService,
        CashierService,
        AuthService
    ],
    entryComponents: [OrderTrackingDialogComponent],
    exports: [HomeSharedModule]
})
export class HomeModule { }