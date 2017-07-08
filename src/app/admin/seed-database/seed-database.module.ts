/**
 * Created by fran lopez on 15/05/2017.
 */

import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SeedDatabaseComponent} from './seed-database.component';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {HTTPService} from '../../shared/services/http.service';
import {ToastService} from '../../shared/services/toast.service';
import {RegExpFormValidatorService} from "../../shared/services/reg-exp-form-validator.service";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FormsModule,
    ],
    declarations: [
        SeedDatabaseComponent
    ],
    providers: [
        HTTPService,
        ToastService,
        RegExpFormValidatorService
    ],
    exports: [
        SeedDatabaseComponent
    ],
    entryComponents: [
        SeedDatabaseComponent
    ]
})
export class SeedDatabaseModule {
}