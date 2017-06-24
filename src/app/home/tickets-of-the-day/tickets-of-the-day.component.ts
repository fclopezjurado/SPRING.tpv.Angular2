/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TicketOfTheDay } from './ticket-of-the-day.model';
import { TicketsOfTheDayService } from './tickets-of-the-day.service';

@Component({
    selector: 'tickets-of-the-day-view',
    templateUrl: './tickets-of-the-day.component.html',
    styles: [`
        md-spinner {
            margin: 0 auto;
        }

        @media only screen and (min-width: 960px) {
            md-card {
                margin: 10em;
                margin-top: 0;
            }
        }
    `]
})
export class TicketsOfTheDayComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    ticketsOfTheDay: TicketOfTheDay[];
    ticketsSubscription: Subscription;
    error: boolean = false;
    columns: Object[] = [
        { name: 'reference' },
        { name: 'total' }
    ];

    constructor(private ticketsOfTheDayService: TicketsOfTheDayService) { }

    ngOnInit() {
        this.ticketsSubscription = this.ticketsOfTheDayService.getTicketsObservable().subscribe((tickets: TicketOfTheDay[]) => {
            this.ticketsOfTheDay = tickets;
            this.loading = false;
        });
        this.ticketsOfTheDayService.getTickets().then((tickets: TicketOfTheDay[]) => {
            this.error = false;
        }).catch((error: string) => {
            this.error = true;
        });
    }

    ngOnDestroy() {
        this.ticketsSubscription && this.ticketsSubscription.unsubscribe();
    }

}