/**
 * @author Fran lopez
 *
 * @author Sergio Banegas Cortijo
 * Github: https://github.com/sergiobanegas
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';
import "hammerjs";

import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome/welcome.module';
import { OrderTrackingModule } from './order-tracking/order-tracking.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        WelcomeModule,
        OrderTrackingModule,
        HomeModule,
        AdminModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }