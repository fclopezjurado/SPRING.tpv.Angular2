/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser, element, by } from 'protractor';

export class WelcomePage {

    navigateTo() {
        return browser.get('/welcome');
    }

    login() {
        element(by.id('login-mobile-input')).sendKeys('123456789');
        element(by.id('login-password-input')).sendKeys('admin');
        return element(by.id('login-submit-button')).click();
    }

}