/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser } from 'protractor';

export class TicketsOfTheDayView {

    navigateTo() {
        return browser.get('/home/tickets-of-the-day');
    }

}