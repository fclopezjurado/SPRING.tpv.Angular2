/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CashierClosure } from '../shared/models/cashier-closure.model';
import { CashierService } from '../shared/services/cashier.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'open-cashier-view',
    templateUrl: './open-cashier.component.html'
})
export class OpenCashierComponent implements OnInit, OnDestroy {

    cashierClosureDate: Date;
    private cashierSubscription: Subscription;

    constructor(private router: Router, private cashierService: CashierService, private toastService: ToastService) { }

    ngOnInit() {
        let currentCashier: CashierClosure = this.cashierService.getCurrentCashier();
        this.cashierClosureDate = currentCashier != undefined ? currentCashier.closureDate : undefined;
        this.cashierSubscription = this.cashierService.getCurrentCashierObservable().subscribe((currentCashier: CashierClosure) => {
            currentCashier.openingDate && !currentCashier.closureDate && this.router.navigate(['/home']);
            this.cashierClosureDate = currentCashier.closureDate;
        });
    }

    open(): void {
        this.cashierService.openCashier().then((cashier: CashierClosure) => {
            this.toastService.info('Cashier opened', "The cashier has been opened and it's now available");
            this.router.navigate(['/home']);
        }).catch((error: string) => {
            this.toastService.error('Error opening cashier', error);
        });
    }

    ngOnDestroy() {
        this.cashierSubscription && this.cashierSubscription.unsubscribe();
    }

}