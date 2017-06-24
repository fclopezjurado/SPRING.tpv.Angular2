/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PaymentComponent } from './purchase/payment/payment.component';
import { PrintComponent } from './purchase/print/print.component';
import { OpenCashierComponent } from './open-cashier/open-cashier.component';
import { CloseCashierComponent } from './close-cashier/close-cashier.component';
import { MovementComponent } from './movement/movement.component';
import { TicketsOfTheDayComponent } from './tickets-of-the-day/tickets-of-the-day.component';

import { HomeGuard } from './home.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [HomeGuard],
        children: [
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', component: SearchComponent },
            { path: 'open-cashier', component: OpenCashierComponent },
            { path: 'close-cashier', component: CloseCashierComponent },
            { path: 'movement', component: MovementComponent },
            {
                path: 'purchase', component: PurchaseComponent, children: [
                    { path: '', redirectTo: 'payment', pathMatch: 'full' },
                    { path: 'payment', component: PaymentComponent },
                    { path: 'print', component: PrintComponent }
                ]
            },
            { path: 'tickets-of-the-day', component: TicketsOfTheDayComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
