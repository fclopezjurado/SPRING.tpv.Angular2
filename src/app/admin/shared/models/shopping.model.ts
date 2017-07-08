/**
 * Created by fran lopez on 09/06/2017.
 */

import {Product} from "../../../shared/models/product.model";

export const AMOUNT_ATTRIBUTE_NAME = 'amount';
export const DISCOUNT_ATTRIBUTE_NAME = 'discount';
export const DESCRIPTION_ATTRIBUTE_NAME = 'description';
export const PRICE_ATTRIBUTE_NAME = 'price';
export const STATE_ATTRIBUTE_NAME = 'shoppingState';
export const CODE_ATTRIBUTE_NAME = 'code';

export class Shopping {
    constructor(public id: number, public amount: number, public discount: number, public description: string,
                public price: number, public shoppingState: string, public code: string, public product: Product,
                public productCode?: string, public retailPrice?: number) {
    }

    equals(shopping: Shopping): boolean {
        return ((shopping.id === this.id) && (shopping.amount === this.amount) && (shopping.discount === this.discount)
        && (shopping.description === this.description) && (shopping.price === this.price)
        && (shopping.shoppingState === this.shoppingState) && (shopping.code === this.code)
        && this.product.equals(shopping.product))
    }
}