/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Product } from '../../../shared/models/product.model';
import { SearchService } from '../shared/services/search.service';
import { ShoppingService } from '../../shared/services/shopping.service';

import { ToastService } from '../../../shared/services/toast.service';

@Component({
    selector: 'product-details-view',
    templateUrl: './product-details.component.html',
    styles: [`
        #button-container {
            position: relative;
        }
        
        #button-container > button {
            float: right;
        }

      	@media only screen and (min-width: 960px) {
    		    #dialog-content {
      		      width: 40em;
      		  }

      		  #product-details-card {
      			    width: 20em;
      		  }

      		  #product-details-container {
      			    background-color: #E1F5FE;
      		  }
            
      		  img {
      			    box-shadow: 2px 2px 3px #aaa;
      		  }
    	  }
    `]
})
export class ProductDetailsComponent {

    product: Product;
    loading: boolean = true;

    constructor(public dialogRef: MdDialogRef<ProductDetailsComponent>, private searchService: SearchService, private shoppingService: ShoppingService, private toastService: ToastService) { }

    initialize(code: string): void {
        this.searchService.getProductDetails(code).then((product: Product) => {
            this.product = product;
            this.loading = false;
        }).catch((error: string) => {
            this.loading = false;
        });
    }

    addToCart(): void {
        this.shoppingService.addProduct(this.product.code).then(() => {
            this.toastService.info('Product added', 'The product has been added to the shopping cart');
        }).catch((error: string) => {
            this.toastService.error('Error adding product', error);
        });
        this.dialogRef.close();
    }

}