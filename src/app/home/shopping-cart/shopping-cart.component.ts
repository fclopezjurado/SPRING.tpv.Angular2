/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { CalculatorComponent } from './calculator/calculator.component';
import { CartProduct } from '../shared/models/cart-product.model';

import { ShoppingService } from '../shared/services/shopping.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'shopping-cart-view',
    templateUrl: './shopping-cart.component.html',
    styles: [`
        #mobile-menu-button {
            position: absolute;
            top: 0px;
            left: 0px;
        }

        #clear-cart-button, #open-calculator-button {
            margin-left: 0.4em;
            float: right;
        }

        @media only screen and (min-width: 600px) {
            #padding-container {
                padding: 10em;
                padding-top: 0em;
            }
        }
    `]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

    @Output() closeSidenavEvent: EventEmitter<boolean> = new EventEmitter();
    codeInput: string = '';
    totalPrice: number = this.shoppingService.getTotalPrice();
    cartProducts: CartProduct[] = this.shoppingService.getCartProducts();
    cartProductsSubscription: Subscription;
    columns: Object[] = [
        { name: 'description' },
        { name: 'retailPrice' },
        { name: 'amount' },
        { name: 'discount' },
        { name: 'delivered' },
        { name: 'totalPrice' }
    ];

    constructor(private shoppingService: ShoppingService, private toastService: ToastService, private router: Router, public dialog: MdDialog) { }

    ngOnInit() {
        this.cartProductsSubscription = this.shoppingService.getCartProductsObservable().subscribe((cartProducts: CartProduct[]) => {
            this.cartProducts = cartProducts;
            this.totalPrice = this.shoppingService.getTotalPrice();
        });
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        this.shoppingService.addProduct(this.codeInput).then(() => {
        }).catch((error: string) => {
            this.toastService.error('Error adding product', error);
        });
        this.codeInput = '';
    }

    updateProduct(row: any, event: any, attribute: string): void {
        let cartProduct: any = this.cartProducts[row.$$index];
        if (attribute !== 'delivered') {
            cartProduct[attribute] = Number(event.target.value);
        } else {
            cartProduct.delivered = !cartProduct.delivered;
        }
        this.shoppingService.updateProduct(cartProduct);
    }

    updateTotalPrice(row: any, event: any): void {
        let cartProduct: any = this.cartProducts[row.$$index];
        let total: number = event.target.value;
        cartProduct.discount = 100 * (1 - (total / (cartProduct.retailPrice * cartProduct.amount)));
        this.shoppingService.updateProduct(cartProduct);
    }

    removeFromCart(cartProduct: CartProduct): void {
        this.shoppingService.removeProduct(cartProduct);
    }

    clearCart(): void {
        this.shoppingService.clear();
    }

    checkout(): void {
        this.router.navigate(['/home/purchase/payment']);
        this.closeSidenavEvent.emit(true);
    }

    openCalculator(): void {
        this.dialog.open(CalculatorComponent);
    }

    calculateProductTotal(cartProduct: CartProduct): number {
        let total: number = cartProduct.retailPrice * cartProduct.amount * (1 - (cartProduct.discount / 100));
        return Math.round(total * 100) / 100;
    }

    roundDiscount(discount: number): number {
        return Math.round(discount * 100) / 100;
    }

    close(): void {
        this.closeSidenavEvent.emit(true);
    }

    ngOnDestroy() {
        this.cartProductsSubscription && this.cartProductsSubscription.unsubscribe();
    }

}
