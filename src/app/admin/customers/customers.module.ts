/**
 * Created by fran lopez on 15/05/2017.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersModule} from '../shared/users.module';
import {CustomersComponent} from './customers.component';

@NgModule({
    declarations: [
        CustomersComponent
    ],
    imports: [
        CommonModule,
        UsersModule
    ]
})
export class CustomersModule {
}