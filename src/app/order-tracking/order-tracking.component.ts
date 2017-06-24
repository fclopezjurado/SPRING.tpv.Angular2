/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductState } from './product-state.model';
import { OrderTrackingService } from './order-tracking.service';

@Component({
    selector: 'order-tracking-view',
    templateUrl: './order-tracking.component.html',
    styles: [`
        md-spinner {
            margin: 0 auto;
        }

        .green {
            color: green;
        }

        #back-button {
            cursor: pointer;
        }

        .red {
            color: red;
        }
        
        .red > button {
            cursor: auto;
        }
    `]
})
export class OrderTrackingComponent implements OnInit {

    ticketReference: string;
    loading: boolean = true;
    products: ProductState[];
    columns = [
        { name: 'productCode' },
        { name: 'description' },
        { name: 'shoppingState' }
    ];

    constructor(private route: ActivatedRoute, private orderTrackingService: OrderTrackingService, private location: Location) { }

    ngOnInit() {
        this.ticketReference = this.route.snapshot.params['reference'];
        this.orderTrackingService.getTicket(this.ticketReference).then((products: ProductState[]) => {
            this.products = products;
            this.loading = false;
        }).catch((error: string) => {
            this.loading = false;
        });
    }

    goToPreviousPage(): void {
        this.location.back();
    }

}