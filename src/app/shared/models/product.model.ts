/**
 * @author Sergio Banegas Cortijo
 * Github: https://github.com/sergiobanegas
 * @author Fran López
 * Github: https://github.com/fclopezjurado
 */

export class Product {
    constructor(public code: string, public reference: string, public description: string,
                public retailPrice: number, public discontinued: boolean, public image: string,
                public longDescription: string) {
    }

    equals(product: Product): boolean {
        return ((product.code === this.code) && (product.reference === this.reference)
        && (product.description === this.description) && (product.retailPrice === this.retailPrice)
        && (product.discontinued === this.discontinued) && (product.image === this.image)
        && (product.longDescription === this.longDescription))
    }
}