/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';

import { HomeSharedModule } from '../../shared/home-shared.module';

import { UserAssociationComponent } from './directives/user-association/user-association.component';
import { UserService } from './directives/user-association/user.service';

@NgModule({
    imports: [HomeSharedModule],
    declarations: [UserAssociationComponent],
    providers: [UserService],
    exports: [HomeSharedModule, UserAssociationComponent]
})
export class PurchaseSharedModule { }