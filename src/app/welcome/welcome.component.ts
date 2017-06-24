import {Component} from '@angular/core';

@Component({
    selector: 'welcome-root',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    tiles = [
        {
            container: false,
            cols: 1,
            rows: 1,
            css: ''
        },
        {
            container: 'header',
            cols: 10,
            rows: 1,
            css: ['border'],
            sub_tile: {
                style: ['header']
            }
        },
        {
            container: false,
            cols: 1,
            rows: 1,
            css: ''
        },
        {
            container: false,
            cols: 1,
            rows: 1,
            css: ''
        },
        {
            container: 'login',
            cols: 4,
            rows: 2,
            css: ['border', 'margin-top']
        },
        {
            container: false,
            cols: 2,
            rows: 1,
            css: ''
        },
        {
            container: 'ticket-details',
            cols: 4,
            rows: 2,
            css: ['border', 'margin-top']
        },
        {
            container: false,
            cols: 1,
            rows: 1,
            css: ''
        }
    ];
}
