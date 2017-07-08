/**
 * Created by fran lopez on 07/07/2017.
 */

import {Shopping} from "./shopping.model";

export class ShoppingUpdate extends Shopping {
    constructor(shopping: Shopping, public productCode: string) {
        super(shopping.id, shopping.amount, shopping.discount, shopping.description, shopping.price,
            shopping.shoppingState, shopping.code, shopping.product);
    }
}