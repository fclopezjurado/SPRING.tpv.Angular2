/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';

import { HomeSharedModule } from '../shared/home-shared.module';

import { OpenCashierComponent } from './open-cashier.component';

@NgModule({
    imports: [HomeSharedModule],
    declarations: [OpenCashierComponent]
})
export class OpenCashierModule { }