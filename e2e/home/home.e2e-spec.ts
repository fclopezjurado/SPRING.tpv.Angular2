/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser } from 'protractor';

import { WelcomePage } from './welcome.po';
import { HomePage } from './home.po';
import { SearchView } from './search/search.po';
import { CartView } from './cart/cart.po';
import { CalculatorView } from './cart/calculator.po';
import { PurchaseView } from './purchase/purchase.po';
import { CloseCashierView } from './close-cashier/close-cashier.po';
import { TicketsOfTheDayView } from './tickets-of-the-day/tickets-of-the-day.po';

describe('Page: Home', () => {

    let welcome: WelcomePage;
    let page: HomePage;
    let searchView: SearchView;
    let cartView: CartView;
    let calculatorView: CalculatorView;
    let purchaseView: PurchaseView;
    let closeCashierView: CloseCashierView;
    let ticketsOfTheDayView: TicketsOfTheDayView;

    beforeAll(() => {
        welcome = new WelcomePage();
        page = new HomePage();
        searchView = new SearchView();
        cartView = new CartView();
        calculatorView = new CalculatorView();
        purchaseView = new PurchaseView();
        closeCashierView = new CloseCashierView();
        ticketsOfTheDayView = new TicketsOfTheDayView();
        welcome.navigateTo();
        welcome.login();
        browser.sleep(3000);
        page.openCashier();
    });

    it(`should display a 'Products' title'`, () => {
        expect(page.getPageTitleText()).toEqual('Products');
    });

    it(`should display a the input submitted when searching a product'`, () => {
        let articleName: string = 'Article1';
        searchView.fillForm(articleName);
        expect(searchView.getSearchResultsText()).toContain(articleName);
    });

    it(`should display the correct title in the tickets of the day page`, () => {
        ticketsOfTheDayView.navigateTo();
        expect(page.getPageTitleText()).toContain('Tickets of the day');
    });

    it(`should display the product with code '8400000001114' when submitted`, () => {
        page.clickCartButton();
        let totalPriceBefore = cartView.getTotalValueText();
        cartView.submitProductCode('8400000001114');
        browser.sleep(3000);
        let totalPriceAfter = cartView.getTotalValueText();
        expect(totalPriceBefore).not.toBe(totalPriceAfter);
    });

    it(`should open the calculator and calculate a sum correctly`, () => {
        cartView.clickOpenCalculatorButton();
        calculatorView.clickNumber(4);
        calculatorView.clickDecimalsButton();
        calculatorView.clickNumber(2);
        calculatorView.clickNumber(5);
        calculatorView.clickSumButton();
        calculatorView.clickNumber(7);
        calculatorView.clickCalculateButton();
        expect(calculatorView.getResultText()).toBe('11.25');
    });

    it('should display the submit button when user association form is filled', () => {
        purchaseView.navigateTo();
        expect(purchaseView.getUserAssociationButton().isEnabled()).toBe(false);
        purchaseView.fillUserAssociationForm();
        expect(purchaseView.getUserAssociationButton().isEnabled()).toBe(true);
    });

    it(`should empty the cart when 'X' button is clicked`, () => {
        page.clickCartButton();
        cartView.submitProductCode('8400000001114');
        cartView.clickClearCartButton();
        expect(cartView.getCartInputs()).toBe(0);
    });

    it(`should show the close cashier button after filling the form`, () => {
        closeCashierView.navigateTo();
        closeCashierView.fillForm();
        browser.sleep(3000);
        expect(closeCashierView.getCloseCashierButton().isEnabled()).toBe(true);
    });

    afterAll(() => {
        closeCashierView.clickCloseCashierButton();
    });

});