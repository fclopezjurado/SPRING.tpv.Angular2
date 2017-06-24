/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser, element, by } from 'protractor';

export class PurchaseView {

    navigateTo() {
        return browser.get('/home/purchase/payment');
    }

    fillUserAssociationForm() {
        return element(by.id('mobile-number-input')).sendKeys(123456789);
    }

    getUserAssociationButton() {
        return element(by.id('user-association-submit-button'));
    }

}