/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';

@Injectable()
export class PDFService {

    openBase64(pdf: string): void {
        let pdfAsDataUri: string = `data:application/pdf;base64,${pdf}`;
        this.open(pdfAsDataUri);
    }

    openBlob(pdf: Blob): void {
        let objectUrl: string = window.URL.createObjectURL(pdf);
        this.open(objectUrl);
    }

    private open(url: string): void {
        window.open(url);
    }

}