/**
 * @author Fran López
 * @author Sergio Banegas Cortijo
 * Github: https://github.com/sergiobanegas
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastyModule } from 'ng2-toasty';
import { DateComponent } from './directives/date.component';
import { CurrencyComponent } from './directives/currency.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { BooleanToStringPipe } from './pipes/bool-to-str.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        JsonpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        ToastyModule
    ],
    declarations: [
        DateComponent,
        CurrencyComponent,
        CapitalizePipe,
        BooleanToStringPipe
    ],
    exports: [
        CommonModule,
        HttpModule,
        JsonpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        ToastyModule,
        DateComponent,
        CurrencyComponent,
        CapitalizePipe,
        BooleanToStringPipe
    ]
})
export class SharedModule { }