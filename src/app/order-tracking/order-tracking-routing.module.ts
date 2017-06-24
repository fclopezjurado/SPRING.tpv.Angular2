/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTrackingComponent } from './order-tracking.component';

const routes: Routes = [
    {
        path: 'order-tracking/:reference',
        component: OrderTrackingComponent
    },
    {
        path: 'order-tracking',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderTrackingRoutingModule { }