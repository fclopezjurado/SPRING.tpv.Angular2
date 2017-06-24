/**
 * Created by fran lopez on 30/05/2017.
 */

export const REFERENCE_ATTRIBUTE_NAME: string = 'reference';
export const CREATED_DATE_ATTRIBUTE_NAME: string = 'created';
export const USER_ID_ATTRIBUTE_NAME: string = 'user';

export class Ticket {
    constructor(public id?: number, public created?: string, public reference?: string, public user?: number) {
    }
}