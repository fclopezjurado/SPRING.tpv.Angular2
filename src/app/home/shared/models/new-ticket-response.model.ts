/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
export class NewTicketResponse {
    constructor(public ticketReference: string, public pdfByteArray: string) { }
}