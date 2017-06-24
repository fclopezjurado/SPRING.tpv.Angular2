/**
 * Created by fran lopez on 06/06/2017.
 */

import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TicketsComponent} from './tickets.component';
import {FilterComponent} from './filter/filter.component';
import {ResultsComponent} from './results/results.component';
import {TicketDetailsDialog} from './details/details.component';
import {EditShoppingDialog} from './edit-shopping/edit-shopping.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {HTTPService} from '../../shared/services/http.service';
import {ToastService} from '../../shared/services/toast.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from '../../shared/services/in-memory-data.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        AngularMaterialModule,
        FormsModule,
        SharedModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true})
    ],
    declarations: [
        TicketsComponent,
        FilterComponent,
        ResultsComponent,
        TicketDetailsDialog,
        EditShoppingDialog
    ],
    providers: [
        HTTPService,
        ToastService
    ],
    exports: [
        TicketsComponent,
        FilterComponent,
        ResultsComponent,
        TicketDetailsDialog,
        EditShoppingDialog
    ],
    entryComponents: [
        TicketDetailsDialog,
        EditShoppingDialog
    ]
})
export class TicketsModule {
}