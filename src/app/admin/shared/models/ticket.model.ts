/**
 * Created by fran lopez on 30/05/2017.
 */

import {User} from "../../../shared/models/user.model";
import {Shopping} from "./shopping.model";

export const ID_ATTRIBUTE_NAME = 'id';
export const REFERENCE_ATTRIBUTE_NAME = 'reference';
export const CREATED_DATE_ATTRIBUTE_NAME = 'created';

export class Ticket {
    constructor(public id?: number, public created?: string, public reference?: string, public user?: User,
                public shoppingList?: Shopping[]) {
    }
}