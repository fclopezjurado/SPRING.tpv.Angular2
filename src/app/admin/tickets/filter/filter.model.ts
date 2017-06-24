/**
 * Created by fran lopez on 07/06/2017.
 */

export const START_DATE_ATTRIBUTE_NAME: string = 'start_date';
export const END_DATE_ATTRIBUTE_NAME: string = 'end_date';

export class Filter {
    constructor(public user?: number, public reference?: string, public start_date?: string,
                public end_date?: string) {
    }
}