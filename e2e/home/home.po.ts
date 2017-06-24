/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser, element, by } from 'protractor';

export class HomePage {

    navigateTo() {
        return browser.get('/home');
    }

    openCashier() {
        element.all(by.id('open-cashier-button')).then(items => {
            items.length > 0 && element(by.id('open-cashier-button')).click();
        });
    }

    getPageTitleText() {
        return element(by.id('page-title')).getText();
    }

    clickCartButton() {
        return element(by.id('cart-button')).click();
    }

}