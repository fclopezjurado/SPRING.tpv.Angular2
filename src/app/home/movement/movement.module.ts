/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { NgModule } from '@angular/core';

import { HomeSharedModule } from '../shared/home-shared.module';

import { MovementComponent } from './movement.component';

@NgModule({
    imports: [HomeSharedModule],
    declarations: [MovementComponent]
})
export class MovementModule { }