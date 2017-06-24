/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CashierClosure } from '../models/cashier-closure.model';
import { CashierService } from './cashier.service';
import { AuthService } from './auth.service';
import { HTTPService } from '../../../shared/services/http.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

export const MockCashierClosureOpen = {
    id: 1,
    openingDate: new Date(),
    closureDate: null,
    amount: 42,
    comment: null
}

export const MockCashierClosureClose = {
    id: 1,
    openingDate: new Date(),
    closureDate: new Date(),
    amount: 123,
    comment: null
}

describe('Service: CashierService', () => {

    let cashierService: CashierService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                AuthService,
                CashierService,
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
        cashierService = TestBed.get(CashierService);
        cashierService.initialize();
    }));

    it(`Should open the cashier when 'openCashier()' is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockCashierClosureOpen) })));
        });
        cashierService.openCashier().then((cashier: CashierClosure) => {
            expect(cashier.closureDate).toBe(null);
        });
    }));

    //same spec as deposit()
    it(`Should make a withdrawal  when 'withdraw()' is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockCashierClosureOpen) })));
        });
        cashierService.withdraw(10).then((cashier: CashierClosure) => {
            expect(cashier.amount).toBe(42);
        });
    }));

    it(`Should close the cashier when 'closeCashier()' is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockCashierClosureClose) })));
        });
        cashierService.closeCashier(123, 'comment').then((cashier: CashierClosure) => {
            expect(cashier.closureDate).not.toBe(null);
            expect(cashier.amount).toBe(123);
        });
    }));


});
