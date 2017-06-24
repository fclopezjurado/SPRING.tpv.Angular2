/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { URI_PRODUCTS, URI_TICKETS, URI_USERS, URI_VOUCHERS } from '../../../app.config';

import { CartProduct } from '../models/cart-product.model';
import { Product } from '../../../shared/models/product.model';
import { User } from '../models/user.model';
import { TicketCheckout } from '../models/ticket-checkout.model';
import { Voucher } from '../models/voucher.model';
import { NewTicketResponse } from '../models/new-ticket-response.model';
import { CashierService } from './cashier.service';

import { HTTPService } from '../../../shared/services/http.service';
import { TPVHTTPError } from '../../../shared/models/tpv-http-error.model';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable()
export class ShoppingService {

    private storage_key: string = 'tpv-shopping_cart';
    private cartProductsSubject: Subject<CartProduct[]> = new Subject<CartProduct[]>();
    private vouchersSubject: Subject<Voucher[]> = new Subject<Voucher[]>();
    private cashReceivedSubject: Subject<number> = new Subject<number>();
    private amountPaidWithCardSubject: Subject<number> = new Subject<number>();
    private submittedSubject: Subject<boolean> = new Subject<boolean>();
    private userMobileSubject: Subject<number> = new Subject<number>();
    private cartProducts: CartProduct[] = JSON.parse(this.storageService.getItem(this.storage_key)) || [];
    private totalPrice: number;
    private userMobile: number;
    private cashReceived: number = 0;
    private amountPaidWithCard: number = 0;
    private vouchers: Voucher[] = [];
    private submitted: boolean = false;
    private ticketReference: string;
    private userAssociated: boolean = false;

    constructor(private storageService: LocalStorageService, private httpService: HTTPService, private cashierService: CashierService) {
        this.updateCart();
    }

    addProduct(productCode: string): Promise<any> {
        this.submitted && this.finishPayment();
        return new Promise((resolve: Function, reject: Function) => {
            this.httpService.get(`${URI_PRODUCTS}/${productCode}`).subscribe((productDetails: Product) => {
                let index: number = this.cartProducts.findIndex((cp: CartProduct) => cp.productCode == productCode);
                index > -1
                    ? this.cartProducts[index].amount++
                    : this.cartProducts.push(new CartProduct(productDetails.code, productDetails.description, productDetails.retailPrice));
                this.updateCart();
                resolve();
            }, (error: TPVHTTPError) => reject(error.description));
        });
    }

    updateProduct(cartProduct: CartProduct): void {
        if (Number.isInteger(cartProduct.amount) && cartProduct.amount > 0 && cartProduct.discount >= 0.00 && cartProduct.discount <= 100.00) {
            let index: number = this.cartProducts.findIndex((cp: CartProduct) => cp.productCode == cartProduct.productCode);
            this.cartProducts[index] = cartProduct;
        } else {
            this.cartProducts = JSON.parse(this.storageService.getItem(this.storage_key)) || [];
        }
        this.updateCart();
    }

    removeProduct(cartProduct: CartProduct): void {
        let index: number = this.cartProducts.indexOf(cartProduct);
        let found: CartProduct[] = this.cartProducts.filter((cp: CartProduct) => {
            return cp.productCode == cartProduct.productCode;
        });
        found.length > 0 && this.cartProducts.splice(index, 1);
        this.updateCart();
    }

    submitOrder(): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let vouchersReferences: string[] = this.vouchers.map((voucher: Voucher) => voucher.reference);
            let cash: number = (this.totalPrice - this.getVouchersTotalPaid() > 0) ? (this.totalPrice - this.getVouchersTotalPaid()) : 0;
            let newTicket: TicketCheckout = new TicketCheckout(this.cartProducts, cash, vouchersReferences, this.userMobile);
            this.httpService.post(`${URI_TICKETS}`, newTicket).subscribe((ticketCreated: NewTicketResponse) => {
                this.submitted = true;
                this.submittedSubject.next(this.submitted);
                this.ticketReference = ticketCreated.ticketReference;
                this.clear();
                this.cashierService.initialize();
                this.userAssociated = this.userMobile !== undefined;
                resolve(ticketCreated);
            }, (error: TPVHTTPError) => reject(error.description));
        });
    }

    associateUser(userMobile: number): Promise<User> {
        return new Promise((resolve: Function, reject: Function) => {
            this.httpService.get(`${URI_USERS}/${userMobile}`).subscribe((associatedUser: User) => {
                this.userMobile = associatedUser.mobile;
                this.userMobileSubject.next(this.userMobile);
                resolve(associatedUser);
            }, (error: TPVHTTPError) => reject(error.description));
        });
    }

    disassociateUser(): void {
        this.userMobile = undefined;
        this.userMobileSubject.next(this.userMobile);
    }

    addVoucher(reference: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let found: Voucher[] = this.vouchers.filter((voucher: Voucher) => {
                return voucher.reference == reference;
            });
            found.length !== 0
                ? reject('The voucher is already added')
                : this.httpService.get(`${URI_VOUCHERS}/${reference}`).subscribe((voucher: Voucher) => {
                    let today: Date = new Date();
                    if (voucher.expiration < today.getTime()) {
                        reject('The voucher entered is expired');
                    } else if (voucher.dateOfUse) {
                        reject('The voucher entered is already used');
                    } else {
                        this.vouchers.push(voucher);
                        this.vouchersSubject.next(this.vouchers);
                        voucher.value > this.totalPrice && this.setCashReceived(0);
                        resolve(voucher);
                    }
                }, (error: TPVHTTPError) => reject(error.description));
        });
    }

    removeVoucher(voucher: Voucher): void {
        let index: number = this.vouchers.indexOf(voucher);
        if (index !== -1) {
            this.vouchers.splice(index, 1);
            this.vouchersSubject.next(this.vouchers);
        }
    }

    clear(): void {
        this.storageService.removeItem(this.storage_key);
        this.cartProducts = [];
        !this.submitted && this.finishPayment();
        this.resetPayment();
        this.updateCart();
    }

    resetPayment(): void {
        this.cashReceived = 0.0;
        this.amountPaidWithCard = 0.0;
        this.vouchers = [];
        this.cashReceivedSubject.next(this.cashReceived);
        this.amountPaidWithCardSubject.next(this.amountPaidWithCard);
        this.vouchersSubject.next(this.vouchers);
    }

    finishPayment(): void {
        this.userMobile = undefined;
        this.submitted = false;
        this.userAssociated = false;
        this.submittedSubject.next(this.submitted);
        this.userMobileSubject.next(this.userMobile);
    }

    private updateCart(): void {
        this.storageService.setItem(this.storage_key, this.cartProducts);
        this.totalPrice = 0.00;
        this.cartProducts.forEach((cartProduct: CartProduct) => {
            this.totalPrice += (cartProduct.amount * cartProduct.retailPrice) - (cartProduct.amount * cartProduct.retailPrice * cartProduct.discount / 100);
            this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        });
        this.cartProductsSubject.next(this.cartProducts);
    }

    getCartProducts(): CartProduct[] {
        return this.cartProducts;
    }

    getCartProductsObservable(): Observable<CartProduct[]> {
        return this.cartProductsSubject.asObservable();
    }

    isSubmitted(): boolean {
        return this.submitted;
    }

    getSubmittedObservable(): Observable<boolean> {
        return this.submittedSubject.asObservable();
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    getUserMobile(): number {
        return this.userMobile;
    }

    getUserMobileObservable(): Observable<number> {
        return this.userMobileSubject.asObservable();
    }

    getVouchers(): Voucher[] {
        return this.vouchers;
    }

    getVouchersObservable(): Observable<Voucher[]> {
        return this.vouchersSubject.asObservable();
    }

    getCashReceived(): number {
        return this.cashReceived;
    }

    getCashReceivedObservable(): Observable<number> {
        return this.cashReceivedSubject.asObservable();
    }

    getAmountPaidWithCard(): number {
        return this.amountPaidWithCard;
    }

    getAmountPaidWithCardObservable(): Observable<number> {
        return this.amountPaidWithCardSubject.asObservable();
    }

    getTicketReference(): string {
        return this.ticketReference;
    }

    isShoppingCartEmpty(): boolean {
        return this.cartProducts.length == 0;
    }

    isUserAlreadyAssociated(): boolean {
        return this.userAssociated;
    }

    getTotalPaid(): number {
        let total: number = this.cashReceived;
        total += this.amountPaidWithCard;
        total += this.getVouchersTotalPaid();
        return total;
    }

    getCashToPay(): number {
        return this.totalPrice - this.getVouchersTotalPaid();
    }

    private getVouchersTotalPaid(): number {
        let total: number = 0.0;
        this.vouchers.forEach((voucher: Voucher) => {
            total += voucher.value;
        });
        return total;
    }

    isPaidOut(): boolean {
        return this.getTotalPaid() >= this.totalPrice;
    }

    setCashReceived(cash: number): void {
        this.cashReceived = cash;
        this.cashReceivedSubject.next(this.cashReceived);
    }

    setAmountPaidWithCard(amount: number): void {
        this.amountPaidWithCard = amount;
        this.amountPaidWithCardSubject.next(this.amountPaidWithCard);
    }

}