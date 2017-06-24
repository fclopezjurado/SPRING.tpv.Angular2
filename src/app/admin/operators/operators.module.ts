/**
 * Created by fran lopez on 15/05/2017.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersModule} from '../shared/users.module';
import {OperatorsComponent} from './operators.component';

@NgModule({
    declarations: [
        OperatorsComponent
    ],
    imports: [
        CommonModule,
        UsersModule
    ]
})
export class OperatorsModule {
}