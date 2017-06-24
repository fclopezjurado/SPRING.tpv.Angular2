/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { NgModule } from '@angular/core';

import { HomeSharedModule } from '../shared/home-shared.module';

import { SearchComponent } from './search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchService } from './shared/services/search.service';

@NgModule({
    imports: [HomeSharedModule],
    declarations: [
        SearchComponent,
        ProductDetailsComponent
    ],
    providers: [SearchService],
    entryComponents: [ProductDetailsComponent]
})
export class SearchModule { }