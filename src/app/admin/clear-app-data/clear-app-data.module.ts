/**
 * Created by fran lopez on 15/05/2017.
 */

import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClearAppDataDialog} from './clear-app-data.component';
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
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true})
    ],
    declarations: [
        ClearAppDataDialog
    ],
    providers: [
        HTTPService,
        ToastService
    ],
    exports: [
        ClearAppDataDialog
    ],
    entryComponents: [
        ClearAppDataDialog
    ]
})
export class ClearAppDataModule {
}