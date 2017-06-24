/**
  * @author Fran López
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        SharedModule
    ],
    exports: [
        FormsModule,
        SharedModule
    ]
})
export class HomeSharedModule { }