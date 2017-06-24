/**
 * Created by fran lopez on 22/05/2017.
 */

import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersComponent} from './directives/users/users.component';
import {FilterComponent} from './directives/filter/filter.component';
import {ResultsComponent} from './directives/results/results.component';
import {NewUserDialog} from './directives/new-user/new-user.component';
import {UserDetailsDialog} from './directives/details/details.component';
import {EditUserDialog} from './directives/edit-user/edit-user.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {HTTPService} from '../../shared/services/http.service';
import {ToastService} from '../../shared/services/toast.service';
import {RegExpFormValidatorService} from '../../shared/services/reg-exp-form-validator.service';
import {UserForm} from './services/user-form.service';
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
        UsersComponent,
        FilterComponent,
        ResultsComponent,
        NewUserDialog,
        UserDetailsDialog,
        EditUserDialog
    ],
    providers: [
        HTTPService,
        ToastService,
        RegExpFormValidatorService,
        UserForm
    ],
    exports: [
        UsersComponent,
        FilterComponent,
        ResultsComponent,
        NewUserDialog,
        UserDetailsDialog,
        EditUserDialog
    ],
    entryComponents: [
        NewUserDialog,
        UserDetailsDialog,
        EditUserDialog
    ]
})
export class UsersModule {
}