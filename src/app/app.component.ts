/**
 * @author Sergio Banegas Cortijo
 * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
      	<router-outlet></router-outlet>
      	<ng2-toasty></ng2-toasty>
    `
})
export class AppComponent { }