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
    selector: 'close-cashier-view',
    templateUrl: './close-cashier.component.html',
    styles: [`
        @media only screen and (min-width: 600px) {
            md-card {
                width: 30em;
            }
        }
    `]
})

export class CloseCashierComponent implements OnInit, OnDestroy {

    countedMoney: number;
    selectedOption: string = 'I agree';
    comment: string = '';
    cashier: CashierClosure;
    cashierSubscription: Subscription;

    constructor(private cashierService: CashierService, private router: Router, private toastService: ToastService) { }

    ngOnInit() {
        this.cashier = this.cashierService.getCurrentCashier();
        this.cashierSubscription = this.cashierService.getCurrentCashierObservable().subscribe((cashier: CashierClosure) => {
            this.cashier = cashier;
        });
        this.formatCountedMoney();
    }

    selectOption(entry: string): void {
        this.selectedOption = entry;
    }

    formatCountedMoney(): void {
        this.countedMoney = this.countedMoney !== undefined ? Math.round(this.countedMoney * 100) / 100 : undefined;
    }

    close(): void {
        let comment: string = this.selectedOption;
        if (this.comment != '') {
            comment += `. ${this.comment}`;
        }
        this.cashierService.closeCashier(this.countedMoney, comment).then((cashier: CashierClosure) => {
            this.toastService.info('Cashier closed', 'The cashier has been closed');
        }).catch((error: string) => {
            this.toastService.error('Error closing the cashier', error);
        });
    }

    getCashierMoney(): number {
        return this.cashier ? this.cashier.amount : 0;
    }

    getDesbalance(): number {
        if (this.cashier) {
            return (this.countedMoney == undefined || isNaN(Number(this.countedMoney.toString()))) ? this.cashier.amount * -1 : this.countedMoney - this.cashier.amount;
        } else {
            return 0;
        }
    }

    isInvalidForm(): boolean {
        return this.countedMoney < 0 || this.countedMoney == undefined;
    }

    ngOnDestroy() {
        this.cashierSubscription && this.cashierSubscription.unsubscribe();
    }

}