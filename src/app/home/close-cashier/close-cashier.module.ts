/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';

import { HomeSharedModule } from '../shared/home-shared.module';

import { CloseCashierComponent } from './close-cashier.component';

@NgModule({
    imports: [HomeSharedModule],
    declarations: [CloseCashierComponent]
})
export class CloseCashierModule { }