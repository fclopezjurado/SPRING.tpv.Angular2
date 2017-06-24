/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component } from '@angular/core';

@Component({
    selector: 'purchase-view',
    template: `
        <h1 id="page-title">Purchase</h1>
        <router-outlet></router-outlet>
    `
})
export class PurchaseComponent { }