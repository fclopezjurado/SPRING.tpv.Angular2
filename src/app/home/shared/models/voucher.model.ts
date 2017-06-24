/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
export class Voucher {
    constructor(public reference: string, public value: number, public created: number, public expiration: number, public dateOfUse: number) {
    }
}