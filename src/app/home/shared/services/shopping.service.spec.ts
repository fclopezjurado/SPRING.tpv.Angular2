/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/add/observable/of';

import { CartProduct } from '../models/cart-product.model';
import { User } from '../models/user.model';
import { Voucher } from '../models/voucher.model';

import { ShoppingService } from './shopping.service';
import { AuthService } from './auth.service';
import { CashierService } from './cashier.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { HTTPService } from '../../../shared/services/http.service';

export const MockProduct = {
    code: '12341234',
    reference: 'article6',
    description: 'article6',
    retailPrice: 20.00,
    discontinued: false
}

export const MockUser = {
    mobile: 666000002,
    username: 'username',
    dni: 'dni',
    email: 'email',
    address: 'address'
}

describe('Service: ShoppingService', () => {

    let product_code: string = '12341234';
    let shoppingService: ShoppingService;
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ShoppingService,
                LocalStorageService,
                MockBackend,
                BaseRequestOptions,
                HTTPService,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                AuthService,
                CashierService
            ]
        });
        shoppingService = TestBed.get(ShoppingService);
        mockBackend = TestBed.get(MockBackend);
    }));

    afterAll(() => {
        shoppingService.clear();
    });


    it(`Should add product to cart when 'addProduct()' is called`, () => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockProduct) })));
        });
        shoppingService.addProduct(product_code).then(() => {
            expect(shoppingService.getCartProducts()).toContain(new CartProduct('12341234', 'article6', 20));
        });
    });

    it(`Should remove product with code '${product_code}' of cart`, () => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockProduct) })));
        });
        shoppingService.addProduct(product_code).then(() => {
            shoppingService.removeProduct(new CartProduct(product_code, 'DESCRIPTION1', 12.21));
            let found: boolean = false;
            shoppingService.getCartProducts().forEach((cartProduct: CartProduct) => {
                if (cartProduct.productCode === product_code) found = true;
            });
            expect(found).toBe(false);
        });
    });

    it(`Should update the product data when 'updateProduct()' method is called`, () => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockProduct) })));
        });
        shoppingService.addProduct(product_code).then(() => {
            let cartProduct: CartProduct = new CartProduct(product_code, 'DESCRIPTION1', 12.21);
            cartProduct.delivered = false;
            shoppingService.updateProduct(cartProduct);
            expect(shoppingService.getCartProducts()[0].delivered).toBe(false);
        });
    });

    it(`Should obtain the total price when 'getTotalPrice()' method is called`, () => {
        let totalPrice: number = shoppingService.getTotalPrice();
        shoppingService.addProduct(product_code).then(() => {
            expect(totalPrice).toBe(12.21);
        });
    });

    it(`Should add a voucher when 'addVoucher()' method is called`, () => {
        shoppingService.addVoucher('reference').then((voucher: Voucher) => {
            expect(shoppingService.getVouchers()).toContain(voucher);
        });
    });

    it(`Should remove a voucher from the list when 'removeVoucher()' method is called`, () => {
        let voucher: Voucher = new Voucher('reference', 12, 0, 0, 0);
        shoppingService.removeVoucher(voucher);
        expect(shoppingService.getVouchers()).not.toContain(voucher);
    });

    it(`Should clear the cart when 'clear()' method is called`, () => {
        shoppingService.clear();
        expect(shoppingService.getCartProducts().length).toBe(0);
    });

    it(`Should associate an user when 'associateUser()' method is called`, () => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockUser) })));
        });
        shoppingService.associateUser(666000002).then((userAssociated: User) => {
            expect(userAssociated.mobile).toBe(666000002);
        });
    });

    it(`Should disassociate an user when 'disassociateUser()' method is called`, () => {
        shoppingService.disassociateUser();
        expect(shoppingService.getUserMobile()).toBe(undefined);
    });

});
