/**
 * Created by fran lopez on 01/05/2017.
 * Module to load all Angular2 Material components.
 * This module could be imported in anywhere to use the shared components.
 */

import {NgModule} from '@angular/core';
import {MdToolbarModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdChipsModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import {MdCheckboxModule} from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';

@NgModule({
    imports: [
        MdToolbarModule,
        MdGridListModule,
        MdInputModule,
        MdButtonModule,
        MdIconModule,
        MdChipsModule,
        MdDialogModule,
        MdCheckboxModule,
        MdAutocompleteModule
    ],
    exports: [
        MdToolbarModule,
        MdGridListModule,
        MdInputModule,
        MdButtonModule,
        MdIconModule,
        MdChipsModule,
        MdDialogModule,
        MdCheckboxModule,
        MdAutocompleteModule
    ]
})
export class AngularMaterialModule {
}
