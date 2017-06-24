/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdSidenav, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeService } from './home.service';
import { CashierClosure } from './shared/models/cashier-closure.model';
import { CashierService } from './shared/services/cashier.service';
import { AuthService } from './shared/services/auth.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
    selector: 'home-view',
    templateUrl: './home.component.html',
    styles: [`
        md-sidenav {
            padding: 1em;
        }
        
		@media only screen and (max-width: 599px) {
			md-sidenav {
				width: 100%;
			}
		}

		@media only screen and (min-width: 600px) {
			md-sidenav {
				width: 45em;
			}
		}
        
		@media only screen and (min-width: 960px) {
			md-sidenav {
				width: 50em;
			}
		}
	`]
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('cart') cartSidenav: MdSidenav;
    cartSideNavOpened: boolean = false;
    openedCashier: boolean = false;
    cashierSubscription: Subscription;
    authSubscription: Subscription;

    constructor(private router: Router, private toastService: ToastService, private dialog: MdDialog, private cashierService: CashierService, private homeService: HomeService, private authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.getAuthorizationObservable().subscribe((authorized: boolean) => {
            !authorized && this.logout();
        });
        this.cashierSubscription = this.cashierService.getCurrentCashierObservable().subscribe((currentCashier: CashierClosure) => {
            this.openedCashier = currentCashier !== null && currentCashier.openingDate !== null && (!currentCashier.closureDate || currentCashier.closureDate === null);
            (!this.openedCashier || currentCashier.openingDate === null) && this.router.navigate(['/home/open-cashier']);
        });
        this.cashierService.initialize();
    }

    closeCartSidenav(): void {
        this.cartSideNavOpened = false;
    }

    openOrderTrackingDialog(): void {
        this.dialog.open(OrderTrackingDialogComponent);
    }

    onClickLogout(): void {
        this.toastService.info('Goodbye', 'You have logged out');
        this.logout();
    }

    private logout(): void {
        this.homeService.logout();
        this.router.navigate(['/welcome']);
    }

    ngOnDestroy() {
        this.authSubscription && this.authSubscription.unsubscribe();
        this.cashierSubscription && this.cashierSubscription.unsubscribe();
    }

}

@Component({
    selector: 'order-tracking-dialog-view',
    template: `
    	<form (ngSubmit)="submitTicketReference($event)" #ticketReferenceForm="ngForm" fxLayout="column">
			<p>Get a ticket state by entering his reference:</p>
            <md-input-container>
				<input mdInput placeholder="Ticket reference" maxLength="255" class="form-control" required
				[(ngModel)]="ticketReferenceInput" name="inputTicketReference" #name="ngModel">
			</md-input-container>
			<button md-raised-button color="primary" type="submit" [disabled]="!ticketReferenceForm.form.valid">OK</button>
        </form>
    `
})
export class OrderTrackingDialogComponent {

    ticketReferenceInput: string;

    constructor(public dialogRef: MdDialogRef<OrderTrackingDialogComponent>, private router: Router) { }

    submitTicketReference(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
        this.router.navigate(['/order-tracking', this.ticketReferenceInput]);
    }

}