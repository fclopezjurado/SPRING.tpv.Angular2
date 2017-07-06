/**
 * Created by fran lopez on 03/07/2017.
 */

export const SIZE_ATTRIBUTE_NAME = 'size';
export const PAGE_ATTRIBUTE_NAME = 'page';
export const SMALL_PAGE_SIZE = 5;
export const MEDIUM_PAGE_SIZE = 10;

export class Page {
    constructor(public size: number, public totalElements?: number,
                public totalPages?: number, public pageNumber?: number) {
        this.size = size;
        this.totalElements = 0;
        this.totalPages = 0;
        this.pageNumber = 0;
    }
}