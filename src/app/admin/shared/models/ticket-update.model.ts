/**
 * Created by fran lopez on 07/07/2017.
 */

import {ShoppingUpdate} from "./shopping-update.model";

export class TicketUpdate {
    constructor(public cash: number, public shoppingUpdateList: ShoppingUpdate[], public vouchers: string[]) {
    }
}