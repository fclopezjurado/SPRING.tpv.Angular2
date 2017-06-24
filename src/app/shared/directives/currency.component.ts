/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'currency',
    template: `{{value | currency:'EUR':true}}`
})
export class CurrencyComponent implements OnInit {

    @Input() value: number;

    ngOnInit() {
    	if (isNaN(this.value)) {
    		this.value = 0;
    	}
    }

} 