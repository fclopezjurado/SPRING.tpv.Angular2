/**
 * Created by fran lopez on 11/05/2017.
 */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminGuard} from './admin.guard';
import {TicketsComponent} from './tickets/tickets.component';
import {ProductsComponent} from './products/products.component';
import {CategoriesComponent} from './categories/categories.component';
import {CashierClosuresComponent} from './cashier-closures/cashier-closures.component';
import {MovementsComponent} from './movements/movements.component';
import {ProvidersComponent} from './providers/providers.component';
import {CustomersComponent} from './customers/customers.component';
import {OperatorsComponent} from './operators/operators.component';
import {ManagersComponent} from './managers/managers.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', redirectTo: 'customers', pathMatch: 'full'},
            {path: 'tickets', component: TicketsComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'categories', component: CategoriesComponent},
            {path: 'cashier_closures', component: CashierClosuresComponent},
            {path: 'movements', component: MovementsComponent},
            {path: 'providers', component: ProvidersComponent},
            {path: 'customers', component: CustomersComponent},
            {path: 'operators', component: OperatorsComponent},
            {path: 'managers', component: ManagersComponent},
            {path: 'statistics', component: StatisticsComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
