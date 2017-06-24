/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { CartProduct } from './cart-product.model';
import { Voucher } from './voucher.model';

export class TicketCheckout {
    constructor(public shoppingList: CartProduct[], public cash: number, public vouchers: string[] = [], public userMobile?: number) { }
}