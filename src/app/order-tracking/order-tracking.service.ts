/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Injectable } from '@angular/core';

import { URI_TICKETS } from '../app.config';

import { ProductState } from './product-state.model';
import { TPVHTTPError } from '../shared/models/tpv-http-error.model';
import { HTTPService } from '../shared/services/http.service';

@Injectable()
export class OrderTrackingService {

    constructor(private httpService: HTTPService) { }

    getTicket(reference: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.httpService.get(`${URI_TICKETS}/tracking/${reference}`).subscribe((products: ProductState[]) => {
                resolve(products);
            }, (error: TPVHTTPError) => reject(error.description));
        });
    }
}