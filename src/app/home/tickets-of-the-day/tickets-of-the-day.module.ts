/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HomeSharedModule } from '../shared/home-shared.module';

import { TicketsOfTheDayComponent } from './tickets-of-the-day.component';
import { TicketsOfTheDayService } from './tickets-of-the-day.service';

@NgModule({
    imports: [
        NgxDatatableModule,
        RouterModule,
        HomeSharedModule
    ],
    declarations: [TicketsOfTheDayComponent],
    providers: [TicketsOfTheDayService]
})
export class TicketsOfTheDayModule { }