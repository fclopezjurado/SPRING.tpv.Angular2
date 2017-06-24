/**
 * Created by fran lopez on 09/06/2017.
 */

export const AMOUNT_ATTRIBUTE_NAME: string = 'amount';
export const DISCOUNT_ATTRIBUTE_NAME: string = 'discount';
export const DESCRIPTION_ATTRIBUTE_NAME: string = 'description';
export const PRICE_ATTRIBUTE_NAME: string = 'price';
export const STATE_ATTRIBUTE_NAME: string = 'state';
export const CODE_ATTRIBUTE_NAME: string = 'code';
export const TICKET_ATTRIBUTE_NAME: string = 'ticket';

export class Shopping {
    constructor(public id: number, public amount: number, public discount: number, public description: string,
                public price: number, public state: string, public code: string, public ticket: number) {
    }

    equals(shopping: Shopping): boolean {
        return ((shopping.id === this.id) && (shopping.amount === this.amount) && (shopping.discount === this.discount)
        && (shopping.description === this.description) && (shopping.price === this.price)
        && (shopping.state === this.state) && (shopping.code === this.code) && (shopping.ticket === this.ticket))
    }
}