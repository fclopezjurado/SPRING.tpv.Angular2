/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProductState }  from './product-state.model';
import { OrderTrackingService } from './order-tracking.service';
import { HTTPService } from '../shared/services/http.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

let productStateMock: ProductState[] = [];
productStateMock.push(new ProductState("article0", "article0", "OPENED"));

describe('Service: OrderTrackingService', () => {

    let product_code: string = 'article0';
    let orderTrackingService: OrderTrackingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                OrderTrackingService,
                MockBackend,
                BaseRequestOptions,
                HTTPService,
                LocalStorageService,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
        orderTrackingService = TestBed.get(OrderTrackingService);
    }));

    it(`Should get the ticket state when 'getTicket()' is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(productStateMock) })));
        });
        orderTrackingService.getTicket('testTicket').then((productState: ProductState) => {
            let product: ProductState = productState[0];
            expect(product.shoppingState).toBe('OPENED');
        })
    }));

});
