/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { URI_TICKETS } from '../../app.config';

import { TicketOfTheDay } from './ticket-of-the-day.model';
import { TPVHTTPError } from '../../shared/models/tpv-http-error.model';
import { HTTPService } from '../../shared/services/http.service';

@Injectable()
export class TicketsOfTheDayService {

    private ticketsOfTheDaySubject: Subject<TicketOfTheDay[]> = new Subject<TicketOfTheDay[]>();
    private ticketsOfTheDay: TicketOfTheDay[];
    private static URI_DAY_TICKETS: string = '/today';

    constructor(private httpService: HTTPService) { }

    getTickets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService.get(`${URI_TICKETS + TicketsOfTheDayService.URI_DAY_TICKETS}`).subscribe((tickets: TicketOfTheDay[]) => {
                this.ticketsOfTheDay = tickets;
                this.ticketsOfTheDaySubject.next(this.ticketsOfTheDay);
                resolve(tickets);
            }, (error: TPVHTTPError) => reject(error.description));
        });
    }

    getTicketsObservable(): Observable<TicketOfTheDay[]> {
        return this.ticketsOfTheDaySubject.asObservable();
    }

}