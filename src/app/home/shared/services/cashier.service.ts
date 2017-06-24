/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { URI_CASHIERCLOSURES } from '../../../app.config';

import { CashierClosure } from '../models/cashier-closure.model';
import { Amount } from '../models/amount.model';
import { CashierClosingData } from '../models/cashier-closing-data.model';

import { AuthService } from './auth.service';
import { HTTPService } from '../../../shared/services/http.service';
import { TPVHTTPError } from '../../../shared/models/tpv-http-error.model';
import { LocalStorageService } from '../../../shared/services/local-storage.service';


@Injectable()
export class CashierService {

    private currentCashierSubject: Subject<CashierClosure> = new Subject<CashierClosure>();
    private currentCashier: CashierClosure;
    private static URI_LAST_CASHIER: string = '/last';
    private static URI_DEPOSIT: string = '/deposit';
    private static URI_WITHDRAW: string = '/withdraw';
    private static URI_CLOSE_CASHIER: string = '/close';

    constructor(private httpService: HTTPService, private authService: AuthService) { }

    initialize(): void {
        this.httpService.get(`${URI_CASHIERCLOSURES + CashierService.URI_LAST_CASHIER}`).subscribe((cashier: CashierClosure) => {
            this.currentCashier = cashier;
            this.currentCashierSubject.next(this.currentCashier);
        }, (error: any) => {
            if (error.error === 'NotExistsCashierClosuresException') {
                this.currentCashier = new CashierClosure();
                this.currentCashierSubject.next(this.currentCashier);
            } else if (error.status === 401) {
                this.authService.reportUnauthorized();
            }
        });
    }

    getCurrentCashierObservable(): Observable<CashierClosure> {
        return this.currentCashierSubject.asObservable();
    }

    getCurrentCashier(): CashierClosure {
        return this.currentCashier;
    }

    openCashier(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.httpService.post(`${URI_CASHIERCLOSURES}`).subscribe((cashier: CashierClosure) => {
                this.currentCashier = cashier;
                this.currentCashierSubject.next(this.currentCashier);
                resolve(this.currentCashier);
            }, (error: TPVHTTPError) => {
                reject(error.description);
            });
        });
    }

    closeCashier(countedMoney: number, comment: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let closureData: CashierClosingData = new CashierClosingData(countedMoney, comment);
            this.httpService.put(`${URI_CASHIERCLOSURES + CashierService.URI_CLOSE_CASHIER}`, closureData).subscribe((cashier: CashierClosure) => {
                this.currentCashier = cashier;
                this.currentCashierSubject.next(this.currentCashier);
                resolve(this.currentCashier);
            }, (error: TPVHTTPError) => {
                reject(error.description);
            });
        });
    }

    withdraw(amount: number): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let amountWrapper: Amount = new Amount(amount);
            this.httpService.put(`${URI_CASHIERCLOSURES + CashierService.URI_WITHDRAW}`, amountWrapper).subscribe((cashier: CashierClosure) => {
                this.currentCashier = cashier;
                this.currentCashierSubject.next(this.currentCashier);
                resolve(cashier)
            }, (error: TPVHTTPError) => {
                reject(error.description);
            });
        });
    }

    deposit(amount: number): Promise<any> {
        let amountWrapper: Amount = new Amount(amount);
        return new Promise((resolve: Function, reject: Function) => {
            this.httpService.put(`${URI_CASHIERCLOSURES + CashierService.URI_DEPOSIT}`, amountWrapper).subscribe((cashier: CashierClosure) => {
                this.currentCashier = cashier;
                this.currentCashierSubject.next(this.currentCashier);
                resolve(cashier)
            }, (error: TPVHTTPError) => {
                reject(error.description);
            });
        });
    }

}