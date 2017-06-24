/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HomeSharedModule } from '../shared/home-shared.module';

import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
    imports: [
        NgxDatatableModule,
        HomeSharedModule
    ],
    declarations: [CalculatorComponent],
    entryComponents: [CalculatorComponent],
    exports: [NgxDatatableModule]
})
export class ShoppingCartModule { }