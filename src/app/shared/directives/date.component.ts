/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, Attribute, NgZone } from '@angular/core'

@Component({
    selector: 'date',
    template: `<a>{{date | date: format}}</a>`,
    styles: [`
        a {
            padding-left: 10px;
            padding-right: 10px;
        }
        @media screen and (max-width: 600px) {
            a {
                visibility: hidden;
                display: none;
            }
        }
    `]
})
export class DateComponent {

    public date: Date;
    public format: string;

    constructor( @Attribute("format") format: string, private ngZone: NgZone) {
        this.format = format;
        this.date = new Date();
        this.ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.ngZone.run(() => {
                    this.date = new Date();
                });
            }, 1000);
        });
    }

} 