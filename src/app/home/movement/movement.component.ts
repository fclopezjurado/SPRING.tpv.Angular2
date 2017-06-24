/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { CashierClosure } from '../shared/models/cashier-closure.model';
import { CashierService } from '../shared/services/cashier.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'movement-view',
    templateUrl: './movement.component.html',
    styles: [`
        @media only screen and (min-width: 960px) {
            #cash-flow-container > md-card, button, #comment-box {
                width: 50%;
            }
        }
        
        @media only screen and (min-width: 1280px) {
            #container {
                margin-right: 25em;
                margin-left: 25em;
            }
        }
    `]
})
export class MovementComponent implements OnInit, OnDestroy {

    operation: string = 'withdraw';
    selectedCommentOption: string;
    otherReasonComment: string = '';
    amount: number;
    cashier: CashierClosure;
    cashierSubscription: Subscription;

    constructor(private location: Location, private cashierService: CashierService, private toastService: ToastService) { }

    ngOnInit() {
        this.cashier = this.cashierService.getCurrentCashier();
        this.cashierSubscription = this.cashierService.getCurrentCashierObservable().subscribe((cashier: CashierClosure) => {
            this.cashier = cashier;
            this.amount = undefined;
        });
    }

    onChangeOperation() {
        this.selectedCommentOption = undefined;
    }

    selectCommentOption(entry: string): void {
        this.selectedCommentOption = entry;
    }

    validateAmount(): void {
        if (this.amount < 0 || this.amount == undefined) {
            this.amount = undefined;
        } else if (this.amount > this.cashier.amount && this.operation == "withdraw") {
            this.amount = this.cashier.amount;
        }
    }

    formatAmount(): void {
        this.amount = Math.round(this.amount * 100) / 100;
    }

    submit(): void {
        let fullComment = this.selectedCommentOption;
        if (this.selectedCommentOption === "Other reason") {
            fullComment += `: ${this.otherReasonComment}`;
        }
        if (this.operation == 'withdraw') {
            this.cashierService.withdraw(this.amount).then((modifiedCashierClosure: CashierClosure) => {
                this.toastService.info('Movement done', 'The withdrawal has been done successfully');
                this.location.back();
            }).catch((error: string) => {
                this.toastService.error('Error making the withdrawal', error);
            });
        } else {
            this.cashierService.deposit(this.amount).then((modifiedCashierClosure: CashierClosure) => {
                this.toastService.info('Movement done', 'The deposit has been done successfully');
                this.location.back();
            }).catch((error: string) => {
                this.toastService.error('Error making the deposit', error);
            });
        }
    }

    isInvalidForm(): boolean {
        return this.selectedCommentOption == null || this.amount == 0 || this.amount == undefined || isNaN(Number(this.amount.toString())) || (this.selectedCommentOption == 'Other reason' && this.otherReasonComment == '');
    }

    getMaxAmount(): number {
        return this.cashier ? this.cashier.amount : 0;
    }

    cancel(): void {
        this.location.back();
    }

    ngOnDestroy() {
        this.cashierSubscription && this.cashierSubscription.unsubscribe();
    }

}